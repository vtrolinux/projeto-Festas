const jwt = require('jsonwebtoken')

//middleware para verificação de autenticação
const checkToken = (req, res, next)=>{
    const token = req.header('auth-token')

    if(!token){
        return res.status(401).json({error: "Acesso Negado"})
    }
    //try valida token efetivo
    try{
        const verificado = jwt.verify(token, 'secretSecreto')
        req.user = verificado
        next()
    }catch(error){
        res.status(400).json({error: 'acesso negado: token inválido'})
    }
}
module.exports = checkToken