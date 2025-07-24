import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

build({
  entryPoints: [join(__dirname, '../server/index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: join(__dirname, '../dist/server.js'),
  format: 'esm',
  external: ['vite'],
  sourcemap: true,
  minify: true,
}).catch(() => process.exit(1));