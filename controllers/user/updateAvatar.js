const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const avatarName = `${_id}_${originalname}`;

  try {
    const image = await jimp.read(tmpUpload);
    await image.resize(250, 250);
    await image.writeAsync(tmpUpload);

    const resultUpload = path.join(avatarsDir, avatarName);

    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join('public', 'avatars', avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
