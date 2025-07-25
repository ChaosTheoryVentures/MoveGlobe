-- Initial database setup for MoveGlobe
-- This file is automatically executed when PostgreSQL container starts

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set default timezone
SET timezone = 'UTC';

-- Create initial indexes for better performance
-- (Drizzle will create the tables, this just adds optimization)

-- Note: The actual schema will be created by Drizzle ORM
-- via the npm run db:push command