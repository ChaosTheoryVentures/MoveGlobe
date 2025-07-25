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
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  
  if (!adminPasswordHash) {
    console.error('ADMIN_PASSWORD_HASH not set in environment variables');
    return false;
  }
  
  // Compare the provided password with the stored hash
  return bcrypt.compare(password, adminPasswordHash);
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