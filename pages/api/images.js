import fs from 'fs';
import path from 'path';

// Helper function to read and parse the JSON file
const readDataFile = () => {
  const filePath = path.join(process.cwd(), 'data.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
};

export default function handler(req, res) {
  const { page = 1, limit = 5 } = req.query;
  const data = readDataFile();
  const images = data.images.sort((a, b) => b.uploaded_at - a.uploaded_at);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedImages = images.slice(startIndex, endIndex);

  res.status(200).json({
    images: paginatedImages,
    totalPages: Math.ceil(images.length / limit),
  });
}