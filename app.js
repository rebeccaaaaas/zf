const express=require('express');
const path=require('path');
const bodyparser = require('body-parser');
const app=express();
const port=8000;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, 'ZF.html'));
})
app.post('/ZF',function(req,res){
    console.log(req.body);
    res.send('success');
})
app.listen(port,function(){
    console.log(`test on http://localhost:${port}`+'  success!');
})





