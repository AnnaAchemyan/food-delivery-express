import fs from 'fs';
import User from '../models/User.js';

export default async function unlinkImage(email, file) {
  const user = await User.findOne({ email, image: file.path });
  if (!user && file && fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }
}
