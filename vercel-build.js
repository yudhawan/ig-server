// vercel-build.js
const { execSync } = require('child_process');

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  // Other build steps...
} catch (error) {
  console.error('Error generating Prisma Client:', error);
  process.exit(1);
}
