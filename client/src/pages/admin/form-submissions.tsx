import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/ui/navbar";
import { Footer } from "../../components/ui/footer";
import { StarsBackground } from "../../components/StarsBackground";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface FormSubmission {
  id: number;
  formTypeId: number;
  status: string;
  createdAt: string;
  ipAddress?: string;
  formType?: {
    name: string;
  };
}

interface FormField {
  fieldName: string;
  fieldValue: string;
}

export default function FormSubmissions() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    formTypeId: '',
    status: '',
    limit: 50,
  });

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Fetch submissions
  const { data: submissionsData, isLoading } = useQuery({
    queryKey: ['submissions', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.formTypeId) params.append('formTypeId', filters.formTypeId);
      if (filters.status) params.append('status', filters.status);
      params.append('limit', filters.limit.toString());

      const response = await fetch(`/api/forms/submissions?${params}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch submissions');
      return response.json();
    },
  });

  // Fetch form types
  const { data: formTypes } = useQuery({
    queryKey: ['formTypes'],
    queryFn: async () => {
      const response = await fetch('/api/forms/types', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch form types');
      const data = await response.json();
      return data.formTypes;
    },
  });

  // Fetch individual submission details
  const { data: submissionDetails } = useQuery({
    queryKey: ['submission', selectedSubmission],
    queryFn: async () => {
      if (!selectedSubmission) return null;
      const response = await fetch(`/api/forms/submissions/${selectedSubmission}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch submission details');
      return response.json();
    },
    enabled: !!selectedSubmission,
  });

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/forms/submissions/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to update status');
      // Refetch submissions
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarsBackground />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <div className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-white">Form Submissions</h1>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
            
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/80 mb-2">Form Type</label>
                  <select
                    value={filters.formTypeId}
                    onChange={(e) => setFilters({ ...filters, formTypeId: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white [&>option]:bg-gray-800"
                  >
                    <option value="">All Types</option>
                    {formTypes?.map((type: any) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white [&>option]:bg-gray-800"
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processed">Processed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Limit</label>
                  <select
                    value={filters.limit}
                    onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white [&>option]:bg-gray-800"
                  >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-6 py-4 text-left text-white/80">ID</th>
                      <th className="px-6 py-4 text-left text-white/80">Type</th>
                      <th className="px-6 py-4 text-left text-white/80">Status</th>
                      <th className="px-6 py-4 text-left text-white/80">Date</th>
                      <th className="px-6 py-4 text-left text-white/80">IP Address</th>
                      <th className="px-6 py-4 text-left text-white/80">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-white/60">
                          Loading...
                        </td>
                      </tr>
                    ) : submissionsData?.submissions?.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-white/60">
                          No submissions found
                        </td>
                      </tr>
                    ) : (
                      submissionsData?.submissions?.map((submission: FormSubmission) => (
                        <tr key={submission.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="px-6 py-4 text-white">{submission.id}</td>
                          <td className="px-6 py-4 text-white">
                            {formTypes?.find((t: any) => t.id === submission.formTypeId)?.name || 'Unknown'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              submission.status === 'processed' 
                                ? 'bg-green-500/20 text-green-300'
                                : submission.status === 'archived'
                                ? 'bg-gray-500/20 text-gray-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {submission.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white">
                            {new Date(submission.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-white/60">
                            {submission.ipAddress || '-'}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedSubmission(submission.id)}
                              className="text-[#4746a4] hover:text-white transition-colors mr-4"
                            >
                              View
                            </button>
                            {submission.status === 'pending' && (
                              <button
                                onClick={() => updateStatus(submission.id, 'processed')}
                                className="text-green-400 hover:text-green-300 transition-colors"
                              >
                                Process
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submission Details Modal */}
            {selectedSubmission && submissionDetails && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Submission #{submissionDetails.submission.id}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Details</h3>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <p className="text-white/80">
                          <span className="font-medium">Status:</span> {submissionDetails.submission.status}
                        </p>
                        <p className="text-white/80">
                          <span className="font-medium">Created:</span> {new Date(submissionDetails.submission.createdAt).toLocaleString()}
                        </p>
                        <p className="text-white/80">
                          <span className="font-medium">IP Address:</span> {submissionDetails.submission.ipAddress || '-'}
                        </p>
                        <p className="text-white/80">
                          <span className="font-medium">User Agent:</span> {submissionDetails.submission.userAgent || '-'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Form Data</h3>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        {submissionDetails.fields?.map((field: FormField, index: number) => (
                          <div key={index} className="text-white/80">
                            <span className="font-medium">{field.fieldName}:</span> {field.fieldValue}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setSelectedSubmission(null)}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Close
                      </button>
                      {submissionDetails.submission.status === 'pending' && (
                        <button
                          onClick={() => {
                            updateStatus(submissionDetails.submission.id, 'processed');
                            setSelectedSubmission(null);
                          }}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                        >
                          Mark as Processed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="mt-8 text-center text-white/60">
              <p>Total: {submissionsData?.total || 0} submissions</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}