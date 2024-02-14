import fs from 'fs';
import formidable from 'formidable';
import path from 'path';

export const config = {
  api: { bodyParser: false },
};

export default async function uploadHandler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/assets";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Server error during file upload.' });
      return;
    }
    const file = files.file;
    if (!file.name.includes('cat')) {
      res.status(400).json({ success: false, message: 'Image name does not contain "cat". Please upload a different image.' });
      return;
    }
    const timestamp = Date.now();
    const filePath = path.join(form.uploadDir, `${timestamp}-${file.name}`);
    fs.rename(file.path, filePath, (err) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Server error during file saving.' });
        return;
      }
      const dataPath = './data.json';
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const imageData = {
        path: filePath.replace('public/', ''),
        uploader: 'admin', // This should be replaced with the actual uploader's username
        uploaded_at: timestamp,
      };
      data.images.push(imageData);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.status(200).json({ success: true, image: imageData });
    });
  });
}