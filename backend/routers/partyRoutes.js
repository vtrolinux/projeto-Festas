const router = require('express').Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')

const Party = require('../models/party')
const User = require('../models/user')

//define file storage
const diskStorage = require('../helpers/file-storage')
const upload = multer({storage: diskStorage})
//midleware
const verifyToken = require('../helpers/check-token')

//helpers
const getUserByToken = require('../helpers/get-user-by-token')

//create new party
router.post('/', verifyToken, upload.fields([{name: "photos"}]), async(req,res) => {
    //upload.fields([{'photos'}]) identificação de quais campos são de upload de arquivo
    //console.log(req)
    const title = req.body.title
    const description = req.body.description
    const partyDate = req.body.party_date

    let files = []
    //verifica se veio arquivos na requisição | *O usuário pode armazenar festas sem fotos
    if(req.files){
        console.log('tem fotos')
        files = req.files.photos
    }
    //validações
    if(title =='null' || description=='null' || partyDate=='null'){
        return res.status(400).json({error: 'Preencha os campos'})
    }
    //verificar usuário
    const token = req.header('auth-token')
    const userByToken = await getUserByToken(token)

    const userId = userByToken._id.toString()
    
        const user = User.findOne({_id: userId},{password: 0})
        console.log('usuario: '+user.toString())
        if (!user) {
            return res.status(400).json({ error: "O usuário não existe!" });
          }
        //salva os caminhos das fotos do upload no backend
        let photos = []
        if(files && files.length > 0){
            
            files.forEach((PHOTO,i) => {
                photos[i] = PHOTO.path
                console.log('path foto: '+ photos[i])
            })

        }
        //montagem de objeto para salvar no sistema
    const party = new Party({
        title: title,
        description: description,
        partyDate: partyDate,
        photos: photos,
        privacy: req.body.privacy,
        userId: userId
    })
    //salva festa no banco
    try{
            const newParty = await party.save()
            res.json({error:null, msg: "Festa adicionada com sucesso", data: newParty})
    }catch(error){
            return res.status(400).json({error})
    }  

})

// listar todas as festas publicas (privacy: false)
router.get('/all',async(req,res)=>{

    try{

        const parties = await Party.find({privacy: false}).sort([['_id:',-1]]) //sort([['_id:',-1]]) as festas mais novas serão exibidas primeiro
        res.json({error:null, parties: parties})
       

    }catch(error){
        return res.status(400).json({error})
    }

})
// todas as festas do usuário
router.get('/userparties', verifyToken, async(req,res) => {

    try{
        
        const token = req.header('auth-token')
        const user = await getUserByToken(token)
        const userId = user._id.toString()

        const partiesUser = await Party.find({userId: userId})
        return res.json({error:null, parties:partiesUser})

    }catch(error){
        return res.status(400).json({error})
    }

})

// get (festa individual) do usuário logado(para edição)
router.get('/userparties/:id', verifyToken, async(req,res)=>{

    try{
        const token = req.header('auth-token')
        const user = await getUserByToken(token)
        const userId = user._id.toString()
    
        const partyId = req.params.id
        const party = await Party.findOne({_id: partyId, userId: userId})
        return res.json({error:null, party: party})

    }catch(error){
        return res.status(400).json({error})
    }
})
//get party public or private
router.get('/:id', verifyToken, async(req,res)=>{
    try{
        const partyId =  req.params.id
        console.log('festa id params: '+partyId)
        const party = await Party.findOne({_id: partyId})
            //festas publicas
        if(party.privacy === false){
            return res.json({error:null, party: party})
        }else{
            //private 
            const token = req.header('auth-token')
            const user = await getUserByToken(token)
            const userId = user._id.toString()
            const partyUserId = party.userId.toString()
            //ver se a festa pertence a ele
            if(userId == partyUserId){
                return res.json({error:null, party: party})
            }

        }
        
    }catch(error){
        return res.status(400).json({msg: 'Evento não existe'})
    }

})

//DELETE festa
router.delete('/', verifyToken, async(req,res)=>{
    const token = req.header('auth-token')
    const user = await getUserByToken(token)
    const userId = user._id.toString()
    const partyId = req.body.id
       
    try{
        const userPartyId = await Party.findOne({_id: partyId})
        if(userId == userPartyId.userId.toString()){
            await Party.deleteOne({_id: partyId, userId: userId})
            return res.json({error:null, msg: 'Festa Deletada'})
        }
    }catch(err){
        return res.status(400).json({error: 'Acesso Negado'})
    }

})
//Update Festa
router.patch('/',verifyToken, upload.fields([{name: 'photos'}]), async(req,res)=>{
    console.log(req)
    
    const title = req.body.title
    const description = req.body.description
    const partyDate = req.body.party_date
    const privacy = req.body.privacy
    const partyId = req.body.id
    const partyUserId = req.body.user_id
    
    let files = []
    //verifica se veio arquivos na requisição | *O usuário pode armazenar festas sem fotos
    if(req.files){
        files = req.files.photos
    }
    //validações
    if(title =='null' || description=='null' || partyDate=='null'){
        return res.status(400).json({error: 'Preencha os campos'})
    }
    //verificar usuário
    const token = req.header("auth-token");

    const userByToken = await getUserByToken(token);
    
    const userId = userByToken._id.toString(); 
  
    const user = await User.findOne({ _id: userId });
  
    if (!user) {
      return res.status(400).json({ error: "O usuário não existe!" });
    }
  
    // build party object
    const party = {
        id: partyId,
        title: title,
        description: description,
        partyDate: partyDate,
        privacy: privacy,
        userId: partyUserId,
    }; 
    //console.log('party sTRING: ' + JSON.stringify(party))
    // create photos array with path
    let photos = [];

    if(files && files.length > 0) {    

        files.forEach((photo, i) => {
        photos[i] = photo.path;
        });

        party.photos = photos;

    }
    
    try {      

        // returns updated data
        const updatedParty = await Party.findOneAndUpdate({ _id: partyId, userId: partyUserId }, { $set: party }, {new: true});
        return res.json({ error: null, msg: "Evento atualizado com sucesso!", data: updatedParty });
    
      } catch (error) {
    
        return res.status(400).json({ error })
          
      }
})
module.exports = router