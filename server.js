const express =require('express')
const session=require('express-session')
const app = express()
app.use(session({
    name:"Tayyab",
    secret:"pakistan",  //Set a Secret key
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:3000}

}))
const counter=(req,res,next)=>{
    if(req.session.count_view){
        req.session.count_view++;
    }
    else{
        req.session.count_view=1;   //We can Handle the session expiration from here
    }
    next()
}
app.get('/create',counter, (req,res)=>{
    res.json({Message:"Session created!",View_Count:req.session.count_view})
})
app.get('/info',(req,res)=>{
    res.json({
    Session_ID:req.session.id,
    count_view:req.session.count_view,
    Maxage:req.session.cookie.maxAge
    ,Actual_MAxage:req.session.cookie.originalMaxAge,
     expires:req.session.cookie.expires
    })
})
app.get('/destroy',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send("Error Occured in Destr")
        }
        else{
            res.send("Session Deleted")
        }
    });
})
app.get('/regenrate',(req,res)=>{
    req.session.regenerate((err)=>{
        if(err){
            res.send("Error Occured in Destr")
        }
        else{
            res.send("Session Regenrated")
        }
    })
})
const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Server is ACTIVE at post ${port}`)
})