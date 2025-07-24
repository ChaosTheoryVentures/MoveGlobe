import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

// Extend Express Request type to include session
declare module 'express-session' {
  interface SessionData {
    isAuthenticated?: boolean;
  }
}

// Middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
}

// Helper function to verify admin password
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  
  // For simplicity, we're doing direct comparison
  // In a real app with multiple users, you'd hash and store passwords
  return password === adminPassword;
}

// Hash password for future use if needed
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Compare password with hash for future use if needed
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}