const { run } = require('./gemini');
const express = require('express');
const cors = require("cors");
const multer = require('multer');
const { spawn } = require('child_process');

const app = express();
// const corsOptions = {
//     origin: `https://${process.env.ANGULAR_KEY||'*'}`,
//      // Update with your Angular app URL
//     optionsSuccessStatus: 200,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,            // enable set cookie
//     allowedHeaders: "*"
// };

app.use(cors());
//app.options('*', cors(corsOptions));
app.use(express.json());

app.post('/api/control', async (req, res) => {
    try {
        console.log(req.body);
        const message = req.body.message;
        const result = await run(message);
        console.log('Received message:', message);
        console.log(result);
        res.json({ message: result });
    } catch (error) {
        console.error("Error occurred in API control endpoint:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST endpoint to receive image uploads
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Spawn a child process to run the Python script
    const pythonProcess = spawn('python', ['./python.py', req.file.path]);

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.stdout.on('end', () => {
        console.log('Data from Python script received completely');
        console.log(`Result from Python script: ${result}`);
        
        // Parse the JSON result
        try {
            const parsedResult = JSON.parse(result);
            console.log(`Parsed result: ${parsedResult.text}`);
            
            // Send the extracted text to the client
            res.json({ text: parsedResult.text });
            
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});
app.get('/',(req,res)=>{
    res.send("<h1>HElloo to server<h1/>")
})
app.listen(process.env.PORT || 3002, function () {
    console.log("connected");
  });