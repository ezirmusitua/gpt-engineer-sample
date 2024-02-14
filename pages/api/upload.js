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
  const parseForm = () => {
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject({ status: 500, message: 'Server error during file upload.' });
        else resolve({ fields, files });
      });
    });
  };

  try {
    const { files } = await parseForm();
    const file = files.file;
    if (!file.name.includes('cat')) {
      return res.json({ success: false, status: 400, message: 'Image name does not contain "cat". Please upload a different image.' });
    }
    const timestamp = Date.now();
    const filePath = path.join(form.uploadDir, `${timestamp}-${file.name}`);
    try {
      fs.renameSync(file.path, filePath);
    } catch (err) {
      return res.json({ success: false, status: 500, message: 'Server error during file saving.' });
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
    return res.json({ success: true, status: 200, image: imageData });
  } catch (error) {
    return res.json({ success: false, ...error });
  }
}