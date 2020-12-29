require('dotenv').config()
const express= require('express');
const app=express()
const jwt=require('jsonwebtoken')
app.use(express.json())

// the application can use json from the body that get pases inside of request 
// we will be passing json from app
//get so to make sure that our server 
// can handle it or not
const posts=[{
    username:"abhinav",
    title:'baap aya'
},
{username:"Arohi",
title:'guess'
}
]
app.get('/posts',(req,res)=>{
    //res.json(posts)
  res.json(posts.filter(post=>post.username===req.user.name))
})
app.post('/login',authenticateToken,(req,res)=>{
    //Authentication user   
    const username=req.body.username
   const user={ name: username }
  const accesstoken=  jwt.sign(user,process.env.TOKEN_SECRET)
    res.json({accesstoken:accesstoken})
})

function authenticateToken(req,res,next){
    //Bearer Token
    console.log(req.headers)
    const authHeader=req.headers['authorization']
    console.log(authHeader)
    const token=authHeader && authHeader.split(' ')[1]
    if(token==null){
        return res.sendStatus(401)
    }
    else{
        jwt.verify(token,process.env.TOKEN_SECRET,(err,user)=>{
            if(err)return res.sendStatus(403)
            req.user=user
            next()
        })
    }
}
app.listen(5000)