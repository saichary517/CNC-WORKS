import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React frontend can fetch from this server in development
app.use(cors());

const PDFS_DIR = path.join(__dirname, 'public', 'pdfs');

// Helper to check if pdfs directory exists, if not create it
if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// Endpoint to list all folders and count of PDFs inside each
app.get(['/api/folders', '/api/folders.json'], (req, res) => {
  try {
    if (!fs.existsSync(PDFS_DIR)) {
      return res.json([]);
    }

    const items = fs.readdirSync(PDFS_DIR, { withFileTypes: true });
    const folders = items
      .filter(item => item.isDirectory())
      .map(item => {
        const folderPath = path.join(PDFS_DIR, item.name);
        const files = fs.readdirSync(folderPath);
        const pdfCount = files.filter(file => file.toLowerCase().endsWith('.pdf')).length;
        
        return {
          name: item.name,
          pdfCount: pdfCount,
          path: `/pdfs/${item.name}`
        };
      })
      // Filter out system directories if any (e.g. .DS_Store, which wouldn't be a dir anyway)
      .filter(folder => !folder.name.startsWith('.'));

    res.json(folders);
  } catch (error) {
    console.error('Error scanning folders:', error);
    res.status(500).json({ error: 'Failed to scan design folders' });
  }
});

// Endpoint to list all PDFs in a specific folder
app.get(['/api/folders/:folderName', '/api/folders/:folderName.json'], (req, res) => {
  try {
    let { folderName } = req.params;
    if (folderName.endsWith('.json')) {
      folderName = folderName.slice(0, -5);
    }
    const folderPath = path.join(PDFS_DIR, folderName);

    // Security check to prevent directory traversal
    if (!folderPath.startsWith(PDFS_DIR)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    const files = fs.readdirSync(folderPath);
    const pdfs = files
      .filter(file => file.toLowerCase().endsWith('.pdf'))
      .map(file => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        
        return {
          name: file,
          displayName: file.replace(/\.pdf$/i, ''),
          sizeBytes: stats.size,
          sizeFormatted: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
          url: `/pdfs/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`
        };
      });

    res.json({
      folderName,
      pdfs
    });
  } catch (error) {
    console.error(`Error scanning folder ${req.params.folderName}:`, error);
    res.status(500).json({ error: 'Failed to retrieve PDFs' });
  }
});

// Serve static assets from build in production
const buildPath = path.join(__dirname, 'dist');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  
  // Also serve public files directly in production (like pdfs/)
  app.use(express.static(path.join(__dirname, 'public')));

  // Wildcard route to handle React routing in production
  app.use((req, res) => {
    // Exclude /api routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // If dist doesn't exist, we are in dev mode, so just serve public folder directly
  app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
