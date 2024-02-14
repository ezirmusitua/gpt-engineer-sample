// New file to handle token verification
import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.username;
  } catch (error) {
    // Handle the error according to your application's needs, e.g., throw an exception, return null, etc.
    return null;
  }
};