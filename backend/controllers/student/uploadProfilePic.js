const formidable = require("formidable");
const { firebaseApp } = require("../../firebase/firebaseConfig");
const fs = require("fs");
const path = require("path");
const Student = require("../../models/student/student.model");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { default: mongoose } = require("mongoose");

const uploadProfilePic = async (req, res) => {
  const storage = getStorage(firebaseApp);

  const form = formidable({ keepExtensions: true, uploadDir: __dirname });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({ success: false, msg: "parse error", err });
    }
    let { id } = fields;
    id = JSON.parse(id);
    console.log("id, files", fields, files);
    if (files.profilePic && mongoose.isValidObjectId(id)) {
      const fileName = files.profilePic.newFilename;

      const imageRef = ref(storage, `profile-pictures/${fileName}`);

      const fileBuffer = fs.readFileSync(
        path.join(__dirname, files.profilePic.newFilename)
      ).buffer;

      uploadBytesResumable(imageRef, fileBuffer)
        .then(async (snapshot) => {
          const url = await getDownloadURL(snapshot.ref);

          await Student.findOneAndUpdate({ _id: id }, { profilePic: url });

          // to remove the saved file
          fs.unlinkSync(path.join(__dirname, files.profilePic.newFilename));

          return res.json({ success: true, url });
        })
        .catch((err) => {
          return res.json({ success: false, err });
        });
    } else {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    }
  });
};

module.exports = { uploadProfilePic };
