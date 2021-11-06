<template>
    <div class="profile">
        <h1>Edite seu perfil</h1>
        <UserForm page='profile' :user='user' btnText='Editar' :key='componentKey' />
    </div>
</template>

<script>
import UserForm from '../components/UserForm'
    export default {
        components : {
            UserForm
        },
        data() {
            return {
                user: {},
                componentKey: 0
            }
        },
        created() {
            //load user
            this.getUser()
        },
        methods: {
            async getUser(){
                //get id from token 
                const id = this.$store.getters.userId
                const token = this.$store.getters.token
                const url = 'http://localhost:3000/api/user/'
                const fetchOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }                   
                }
                await fetch(url+id,fetchOptions)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log('Carregou o usuário.')
                    console.log(data.user)
                    this.user = data.user           
                    this.componentKey += 1 //quando ele carregar ele atualiza o componente vazio com os dados buscados


                }).catch((err)=>{
                    console.log(err)
                })
                
            }
        }

    }
</script>

<style scoped>
    .profile {
        text-align: center;
        padding-top: 40px;
        padding-bottom: 100px;
    }
    .profile h1 {
        margin-bottom: 40px
    }
</style>
