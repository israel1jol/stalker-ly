const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if( file.mimetype == 'image/png'  || file.mimetype == 'image/jpg' || file.mimetype == "image/jpeg"){
            callback(null, true)
        }
        else{
            console.log("Only jpg & png file supported no support for "+file.mimetype)
            return callback({"error" : "Invalid file format"}, false)
        }
    },
    limits:{
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;