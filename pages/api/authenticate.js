import { readFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const usersFilePath = path.join(process.cwd(), 'user.json');
    try {
      const jsonData = await readFile(usersFilePath, 'utf8');
      const usersData = JSON.parse(jsonData);
      const user = usersData.users.find(u => u.username === username);

      if (user && user.password === password) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error ' + error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}