const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

app.post('/api/build', upload.single('icon'), async (req, res) => {
  try{
    const { url, name, splash } = req.body;
    if(!url || !/^https?:\/\//.test(url)) return res.status(400).json({ message: 'رابط غير صالح' });
    const jobId = uuidv4();
    const jobDir = path.join(__dirname, 'jobs', jobId);
    fs.mkdirSync(jobDir, { recursive: true });
    fs.writeFileSync(path.join(jobDir, 'meta.json'), JSON.stringify({ url, name, splash }, null, 2));
    if(req.file){
      const dest = path.join(jobDir, 'icon.png');
      fs.renameSync(req.file.path, dest);
    }
    console.log('New build job:', jobId, 'url=', url);
    res.json({ jobId });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
});

app.get('/health', (req,res)=>res.send('ok'));

const port = process.env.PORT || 3001;
app.listen(port, ()=>console.log('Backend running on', port));
