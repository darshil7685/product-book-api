const multer = require('multer');
let upload;
try {
    upload = multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'public/profile_pic')
            },
            filename: function(req, file, cb) {
                const ext = file.originalname.split('.');
                cb(null, +Date.now() + "." + ext[ext.length - 1])
            }
        })
    });
} catch (err) {
    throw err
}

module.exports = upload