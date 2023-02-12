/* const express = require('express')
const multer = require('multer')
const UPLOADS_FOLDER = "./uploads"
var upload = multer({
    dest:UPLOADS_FOLDER
})
const app = express()
app.post("/",upload.single("name1"),(req,res)=>{
    res.send("hello world1")
})
app.listen(3000,()=>{
    console.log("app listening at port 3000")
}) */

/* const express = require('express')
const multer = require('multer')
const UPLOADS_FOLDER = "./uploads"
var upload = multer({
    dest:UPLOADS_FOLDER
})
const app = express()
app.post("/",upload.array("name1",3),(req,res)=>{
    res.send("hello world1")
})
app.listen(3000,()=>{
    console.log("app listening at port 3000")
}) */

/* const express = require('express')
const multer = require('multer')

const UPLOADS_FOLDER = "./uploads"

var upload = multer({
    dest:UPLOADS_FOLDER
})

const app = express()

app.post("/",upload.fields([
    {name:"name1",maxCount:1},
    {name:"gallery",maxCount:2},
]),(req,res)=>{
    res.send("hello world1")
})

app.listen(3000,()=>{
    console.log("app listening at port 3000")
}) */

const express = require('express')
const multer = require('multer')
const path = require('path')
const UPLOADS_FOLDER = "./uploads"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
  
      cb(null, fileName + fileExt);
    },
  });

var upload = multer({
    storage:storage,
    limits:{
        fileSize:100000000, // 100MB
    },
    fileFilter: (req, file, cb) => {
       
        if (file.fieldname === "name1") {
          if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
          ) {
            cb(null, true);
          } else {
            cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
          }
        } else if (file.fieldname === "doc") {
          if (file.mimetype === "application/pdf") {
            cb(null, true);
          } else {
            cb(new Error("Only .pdf format allowed!"));
          }
        } else {
          cb(new Error("There was an unknown error!"));
        }
      },
})

const app = express()

app.post("/",upload.fields([
    {name:"name1",maxCount:1},
    {name:"doc",maxCount:1},
]),(req,res)=>{
    console.log(req.files)
    res.send("hello world11")
})


// default error handler
app.use((err, req, res, next) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        res.status(500).send("There was an upload error!");
      } else {
        res.status(500).send(err.message);
      }
    } else {
      res.send("success");
    }
  });

app.listen(3000,()=>{
    console.log("app listening at port 3000")
})