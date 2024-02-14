import fs from 'fs';
import path from 'path';

// This is a simple example assuming that user identification is done via a query parameter.
// In a real-world scenario, you would use authentication tokens and user sessions.
import { verifyToken } from '../../utils/auth';

export default function handler(req, res) {
  // Verify the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("[DEBUG] token ", token)
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { userId } = req.query; // Replace with actual user identification mechanism

  const dataFilePath = path.join(process.cwd(), 'data.json');
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const jsonData = JSON.parse(data);
    const userImages = jsonData.images.filter(image => image.uploader === userId);
    res.status(200).json({ images: userImages });
  });
}