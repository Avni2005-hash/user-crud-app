const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'delta_app',
    password:'mysqlavni'
});

let getRandomUser=()=>{
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
];
}
let getid=()=>{
    return[faker.string.uuid()];
}
//inserting new data
// let q="insert into user (id,username,email,password) values ?";

let data=[];
// for(let i=0;i<=100;i++){data.push(getRandomUser());}//100 fake users

// try{
// connection.query(q,[data],(err,result)=>{
//     if(err) throw(err)
//     console.log(result);
// });
// }catch(err){
//     console.log(err);
// }

// connection.end();
//home route
app.get("/",(req,res)=>{
    let q="select count(*) from user";
    try{
    connection.query(q,[data],(err,result)=>{
        if(err) throw(err)
        let count=result[0]["count(*)"];

        res.render("home.ejs",{count});
    });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
    
});

//show route
app.get("/user",(req,res)=>{
    let q="select * from user";
    try{
    connection.query(q,[data],(err,users)=>{
        if(err) throw(err)
        // console.log(result);

        res.render("showusers.ejs",{users});
    });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
})

//edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`select * from user where id='${id}'`;
    try{
    connection.query(q,(err,result)=>{
        if(err) throw(err)
        let user=result[0];
        res.render("edit.ejs",{user});
    });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
});

//update route

app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formPass,username:newUsername}=req.body;
    let q=`select * from user where id='${id}'`;
    try{
    connection.query(q,(err,result)=>{
        if(err) throw(err)
        let user=result[0];
    if(formPass!=user.password){
        res.send("Wrong password");
    }else{
        let q2=`update user set username='${newUsername}' where id='${id}'`;
        connection.query(q2,(err,result)=>{
            if(err) throw err;
            res.redirect("/user");
        })
        
    }
        
    });
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
    
})
//Add route
app.get("/user/add",(req,res)=>{
    res.render("add.ejs");
})
app.post("/user/add",(req,res)=>{
    let {username,email,password}=req.body;
    let id=getid();
    let q=`insert into user(id,username,email,password) values('${id}','${username}','${email}','${password}')`
    try{
        connection.query(q,(err,result)=>{
        if(err) throw err;
        res.redirect("/user");
        
        })
}
    catch(err){
        console.log(err);
        res.send("Some error in database");
      }

    })
app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
    let q=`delete from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
        if(err)throw err;
        res.redirect("/user");
    })
}
    catch(err){
        console.log(err);
        res.send("Error occurred");
    }
    
    })

app.listen("8080",()=>{
    console.log("Server is listening to port 8080");
});

