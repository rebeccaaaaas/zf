const express=require('express');
const path=require('path');
const mysql=require('mysql')
const bodyparser = require('body-parser');
const { callbackify } = require('util');
const app=express();
const port=8000;
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'zf'
})
connection.connect();
const sql='SELECT number FROM zf';
const addSql='INSERT INTO zf(name,number,phone,qq,major,reason,wish,myArray) VALUES(?,?,?,?,?,?,?,?)';
const delSql='DELETE FROM zf where number=?';
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/',express.static('public'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, './public/ZF.html'));
})
app.post('/ZF',function(req,res){
    console.log(req.body);
    connection.query(sql,[req.body.form.nunmber],function(err,result){
        if(err){
            console.log(err);
            return;
        }
        console.log(result)
    });
    connection.query(delSql,[ 
            req.body.form.number],function(err,result){
                if(err){
                    console.log(err);
                    return;
                }
             console.log(result)    
            })
        connection.query(addSql,[
                req.body.form.name,
                req.body.form.number,
                req.body.form.phone,
                req.body.form.qq,
                req.body.form.major,
                req.body.form.reason,
                req.body.form.wish,
                req.body.myArray],function (err, result) {
                    if(err){
                    console.log(err);
                    return;
            }     
            console.log(result)
            res.send('success');       
        });    
        //connection.query(sql,[req.body.form.number,],function (err, result) {
              //  if(err){
               // console.log(err);
                //return;
        //}     
        //console.log(result)
           // if(count>1){
              //  connection.query(modSql,[
                   // req.body.form.name,
                   // req.body.form.number,
                    //req.body.form.phone,
                    //req.body.form.qq,
                    //req.body.form.major,
                    //req.body.form.reason,
                    //req.body.form.wish,
                    //req.body.myArray],function (err, result) {
                      //  if(err){
                        //console.log(err);
                        //return;
                //}     
                //console.log(result)
                //}); 
           // }    
       // }); 
    });
app.listen(port,function(){
    console.log(`test on http://localhost:${port}`+'  success!');
})





