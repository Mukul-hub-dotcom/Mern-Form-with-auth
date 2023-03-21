const express = require('express')
const jwt=require('jsonwebtoken')

const app = express()
const secretKey="secretkey"




app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message:'a sample api'
    })
})

app.post('/register',(req,res)=>{
    res.send('Register')
})
app.post('/login',(req,res)=>{
    const user={
        id:1,
        username:'Anil',
        email:'abc@test.com'
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })
    })

})

app.post('/profile',verifyToken,(req,res)=>{
jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
        res.send('invalid token')
    }
    else{
        res.json({
            message:'profile accessed',
            authData
        })
    }
})
})

function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization']
    
if (typeof bearerHeader!=='undefined'){
    const bearer=bearerHeader.split(' ')
    const token=bearer[1]
    req.token=token
    console.log(token)
    next()
}
else{
    res.send({
        result:'token not valid'
    })
}
}





app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})