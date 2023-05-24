async function validateFile(req, res, next) {
    const file = req.file;
  
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });

      return next()
    }
  
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return res.status(400).json({ message: 'Invalid file format, file only png/jpg' });
    }

    return next()
    
}

module.exports = validateFile 