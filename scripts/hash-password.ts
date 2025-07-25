#!/usr/bin/env node
import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password <password>');
  process.exit(1);
}

async function hashPassword() {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Password hash:');
  console.log(hash);
  console.log('\nAdd this to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}

hashPassword().catch(console.error);