const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

// Global error handlers: server must never crash
process.on('uncaughtException', (err) => {
  console.error('[SERVER UNCAUGHT EXCEPTION]', err && err.message ? err.message : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('[SERVER UNHANDLED REJECTION]', reason);
});

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

const server = http.createServer((req, res) => {
  req.on('error', (err) => {
    console.warn('[REQ ERROR]', err && err.message ? err.message : err);
  });
  res.on('error', (err) => {
    console.warn('[RES ERROR]', err && err.message ? err.message : err);
  });

  try {
    // CORS & Cache headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    let reqUrl = req.url || '/';
    let rawPath = reqUrl.split('?')[0];
    let reqPath;
    try {
      reqPath = decodeURIComponent(rawPath);
    } catch {
      reqPath = rawPath;
    }

    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    // Normalize path to prevent directory traversal
    let safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.resolve(DIST_DIR, '.' + safePath);

    // Fallback to public directory if not found in dist
    if (!fs.existsSync(filePath)) {
      filePath = path.resolve(PUBLIC_DIR, '.' + safePath);
    }

    // SPA fallback: if file does not exist or is a directory, serve dist/index.html
    let isDir = false;
    try {
      if (fs.existsSync(filePath)) {
        isDir = fs.statSync(filePath).isDirectory();
      }
    } catch {
      isDir = false;
    }

    if (!fs.existsSync(filePath) || isDir) {
      filePath = path.resolve(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (res.writableEnded || res.destroyed) return;
      if (err) {
        try {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('500 - Errore server: ' + err.message);
        } catch {}
        return;
      }
      try {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
        });
        res.end(data);
      } catch {}
    });
  } catch (err) {
    console.error('[REQUEST PROCESSING ERROR]', err);
    if (!res.writableEnded && !res.destroyed) {
      try {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('500 - Errore: ' + err.message);
      } catch {}
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('========================================================');
  console.log('  PATH TO WWII — Scacchiere Globale Server Attivo');
  console.log(`  URL: http://localhost:${PORT}`);
  console.log('========================================================');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`[INFO] Porta ${PORT} gia' occupata da un processo attivo.`);
  } else {
    console.error('[ERRORE SERVER]', err);
  }
});
