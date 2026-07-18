import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDFS_DIR = path.join(__dirname, 'public', 'pdfs');
const API_DIR = path.join(__dirname, 'public', 'api');
const FOLDERS_API_DIR = path.join(API_DIR, 'folders');

// Helper to check and create directories
if (!fs.existsSync(API_DIR)) {
  fs.mkdirSync(API_DIR, { recursive: true });
}
if (!fs.existsSync(FOLDERS_API_DIR)) {
  fs.mkdirSync(FOLDERS_API_DIR, { recursive: true });
}

try {
  if (fs.existsSync(PDFS_DIR)) {
    const items = fs.readdirSync(PDFS_DIR, { withFileTypes: true });
    
    // 1. Generate folders.json
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
      .filter(folder => !folder.name.startsWith('.'));

    fs.writeFileSync(
      path.join(API_DIR, 'folders.json'),
      JSON.stringify(folders, null, 2)
    );
    console.log('Generated /api/folders.json successfully.');

    // 2. Generate folders/[folderName].json for each folder
    folders.forEach(folder => {
      const folderPath = path.join(PDFS_DIR, folder.name);
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
            url: `/pdfs/${encodeURIComponent(folder.name)}/${encodeURIComponent(file)}`
          };
        });

      const folderData = {
        folderName: folder.name,
        pdfs
      };

      fs.writeFileSync(
        path.join(FOLDERS_API_DIR, `${folder.name}.json`),
        JSON.stringify(folderData, null, 2)
      );
      console.log(`Generated /api/folders/${folder.name}.json successfully.`);
    });
  } else {
    console.warn(`PDFs directory not found at ${PDFS_DIR}. Creating empty index.`);
    fs.writeFileSync(path.join(API_DIR, 'folders.json'), JSON.stringify([], null, 2));
  }
} catch (error) {
  console.error('Error generating static API files:', error);
  process.exit(1);
}
