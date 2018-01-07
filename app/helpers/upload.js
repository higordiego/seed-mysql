const fs = require('fs')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const storage = multer.diskStorage({
    destination: 'public/imagens/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const upload = multer({ storage: storage })

function uploadRemove (file) {
    const locate = path.join(__dirname, '../../', 'public/imagens/') + file
    fs.unlink(locate)
}

module.exports = {
    uploadImage: upload,
    uploadRemove: uploadRemove
}
