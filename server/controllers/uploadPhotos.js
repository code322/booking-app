import download from 'image-downloader';
import path from 'path';

export const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + '.jpg';

  try {
    await download.image({
      url: link,
      dest: path.resolve('uploads/' + newName),
    });
    res.status(200).json(newName);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const uploadFromLocal = async (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    uploadedFiles.push(req.files[i].filename);
  }
  res.json(uploadedFiles);
};
