//modules
const express = require('express')
const mongoose = require('mongoose')
const Bodyparser = require('body-parser') 
const cors = require('cors') 

//routes
const authRouter = require('./routers/authRoutes.js')
const userRouter = require('./routers/userRoutes')
const partyRouter = require('./routers/partyRoutes')
//middleware

//config
const nomeBanco = 'bancoFestas'
const port = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/party', partyRouter)

//atrelar rotas ao express

app.get('/',(req,res)=>{
    res.json({menssage: 'ok'})
})

app.listen(port,()=>{
    console.log(`SERVIDOR SENDO EXECUTADO NA PORTA ${port}`)
})

//conexao mongodb
mongoose.connect(`mongodb://localhost/${nomeBanco}`, 
{
  useNewUrlParser: true,
 // useFindAndModify: false,
  useUnifiedTopology: true
})

