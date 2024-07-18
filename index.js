const mongoose = require("mongoose");
const express=require("express");
const app=express();

const path=require("path");

const route=8080;

const Chat=require("./models/chats");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("successfully connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen(route,()=>
{
    console.log("server is listening at 8080;");
});

app.get("/",(req,res)=>
{
    res.send("root is working");    
});

let chat1=new Chat({
    from:"hamza",
    to:"shumail",
    msg:"hello",
    createdAt:new Date(),
});

// chat1.save().then((res)=>
// {
//     console.log(res);
// });

let chats=[{
    from:"anas",
    to:"shumail",
    msg:"xmemxwemi",
    createdAt:new Date(),
},{
    from:"hassan",
    to:"anas",
    msg:"oioioiooooiooi",
    createdAt:new Date(),
},{
    from:"lol",
    to:"me",
    msg:"xdxdxdxd",
    createdAt:new Date(),
},{
    from:"damn",
    to:"kiutta",
    msg:"okokdear",
    createdAt:new Date(),
}];

// Chat.insertMany(chats).then((res)=>
//     {
//         console.log(res);
//     });

app.get("/chats",async(req,res)=>
{
    let chats=await Chat.find();
    console.log(chats);
    try{
    res.render("index.ejs",{chats});
    } catch(err)
    {
        console.log(err);
    }
});

app.get("/chats/new",(req,res)=>
{
    res.render("form.ejs");
});

app.post("/chats",async(req,res)=>
{
    let {to,from,message}=req.body;
    try{
     let chat22=new Chat({
        to:to,
        from:from,
        msg:message,
        createdAt:new Date(),
    });
    await chat22.save();
    res.redirect("/chats");
}catch(err)
{
    console.log(err);
}
});

app.get("/chats/:id/update",async(req,res)=>
{
    let {id}=req.params;
        let chat= await Chat.findById(id);
        res.render("update.ejs",{chat});
});

app.put("/chats/:id",async(req,res)=>
{
    let {message}=req.body;
    let {id}=req.params;
    await Chat.findByIdAndUpdate(id,{
        msg:message,
    });
    res.redirect("/chats");
});

