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

const uploadResume = async (req, res) => {
  const storage = getStorage(firebaseApp);

  const form = formidable({ keepExtensions: true, uploadDir: __dirname });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({ success: false, msg: "parse error", err });
    }

    let { id } = fields;
    id = JSON.parse(id);

    if (files.resume && mongoose.isValidObjectId(id)) {
      const fileName = files.resume.newFilename;

      const resumeRef = ref(storage, `resume/${id}/${fileName}`);

      const fileBuffer = fs.readFileSync(path.join(__dirname, fileName)).buffer;

      uploadBytesResumable(resumeRef, fileBuffer)
        .then(async (snapshot) => {
          const url = await getDownloadURL(snapshot.ref);

          await Student.findOneAndUpdate({ _id: id }, { resume: url });

          // to remove the saved file
          fs.unlinkSync(path.join(__dirname, fileName));

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

module.exports = { uploadResume };
