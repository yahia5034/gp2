const { run } = require('./gemini');
const express = require('express');
const cors = require("cors");
const multer = require('multer');
const { spawn } = require('child_process');
const Tesseract =require("tesseract.js");
const axios =require("axios")
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/control', async (req, response) => {
    const message= req.body.message;
    console.log(message);
    switch(message){
    /*New Area*/
        case "describe":
        case "lidar":
        case "find": 
            axios.post("http://192.168.137.223:8080/api/data",{
                message: message
            }).then(res =>{
                console.log(res.data);
                response.json(res.data);
            })
            .catch((error)=>{
            console.log(error);
            });
              console.log("message sent succesfully ")
            break;
    /*End of new area*/
        /* These cases are handled in the Angular Typescript....
        case "maps":
            //maps code call abdo .....
            break;
        case "go":
            // call abdo ....
            break;
        case "read":
            //call abdo ocr
            break;
        */
        default:
            try {
                console.log(req.body);
                const message = req.body.message;
                const result = await run(message);
                console.log('Received message:', message);
                console.log(result);
                response.json({ message: result });
            } catch (error) {
                console.error("Error occurred in API control endpoint:", error);
                response.status(500).json({ error: "Internal server error" });
            }
    }
});

// Multer configuration for handling file uploads
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload= multer({storage:storage});

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);

    try {
        Tesseract.recognize(
            'uploads/' + req.file.filename,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            return res.json({
                text: text
            });
        });
    } catch (error) {
        console.error(error);
    }
});
app.get('/',(req,res)=>{
    res.send("<h1>HElloo to server<h1/>")
})
app.listen(process.env.PORT || 3002, function () {
    console.log("connected");
});

