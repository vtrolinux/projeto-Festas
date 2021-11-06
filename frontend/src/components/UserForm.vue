<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="user-form" @submit="page ==='register' ? register($event) : update($event)">
            <input type="hidden" name='id' id='id' v-model='id'>
            <div class="input-container">
                <label for="name">Nome:</label>
                <input type="text" id='name' name='name' v-model='name' placeholder="Digite o seu nome...">
            </div>
            <div class="input-container">
                <label for="email">E-mail:</label>
                <input type="text" id='email' name='email' v-model='email' placeholder="Informe o seu E-mail...">
            </div>
            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" id='password' name='password' v-model='password' placeholder="Digite uma senha...">
            </div>
            <div class="input-container">
                <label for="confirmPassword">Senha:</label>
                <input type="password" id='confirmPassword' name='confirmPassword' v-model='confirmPassword' placeholder="Repita sua senha...">
            </div>
            <InputSubmit :text='btnText'/>
        </form>
    </div>
</template>

<script>

    import InputSubmit from './form/InputSubmit.vue'
    import Message from './Message.vue'

export default {
    name: "RegisterForm",  
    props: ["user","page","btnText"],
    components: {
        InputSubmit,
        Message
    },
    data(){
        return {
            id: this.user._id||null,
            name: this.user.name || null,
            email: this.user.email ||null,
            password: null,
            confirmPassword: null,
            msg: null,
            msgClass: null
        }
    },
    methods: {
        async register(e){

            e.preventDefault() //nao da refresh quando envia o formulario
            const url = 'http://localhost:3000/api/auth/register'
            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            }
            const jsonData = JSON.stringify(data)
            console.log(jsonData)

            const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
            }

            await fetch(url, fetchOptions)
            .then((resp) =>  resp.json())
            .then((data) => {
                console.log('data: '+ data)
                    let auth = false
                    if(data.error){
                        this.msg = data.error
                        this.msgClass = 'error'
                        console.log('dataerror: '+data.error)
                    }else{
                        auth = true
                        this.msg = data.msg
                        this.msgClass = 'success'

                        //emitir evento para o vuex salvar o usuario(storage) ex: salvar token/id para uso futuro
                        this.$store.commit('authenticate', {token: data.token, userId: data.userId})
                    }
                    setTimeout(() => {
                        if(!auth){
                        this.msg = null
                    }else{
                        //se efetuar o login redireciona para dashboard
                        this.$router.push('dashboard')
                    }
                    },2000)// apaga a mensagem de confirmação depois de 2 segundos

                }).catch((err) => {
                    console.log(err)
                })

        },
        async update(e){
            e.preventDefault()

            const token = this.$store.getters.token
            //const id = this.$$store.getters.userId
            
            const url = 'http://localhost:3000/api/user/'
            const data = {
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            }
            const jsonData = JSON.stringify(data)
            console.log(jsonData)

            const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'auth-token': token
            },
            body: jsonData
            }

            await fetch(url, fetchOptions)
            .then((resp) =>  resp.json())
            .then((data) => {
               
                    
                    if(data.error){
                        this.msg = data.error
                        this.msgClass = 'error'
                        console.log('dataerror: '+data.error)
                    }else{
                       
                        this.msg = data.msg
                        this.msgClass = 'success'

                    }
                    setTimeout(() => {

                       this.msg = null

                    },2000)// apaga a mensagem de confirmação depois de 2 segundos

                }).catch((err) => {
                    console.log(err)
                })
            console.log('está atualizado')
        }
    }
}
</script>

<style scoped>
    #user-form {
        max-width: 400px;
        margin:0 auto;
        display: flex;
        flex-direction: column;
    }
    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        text-align: left;
    }
    .input-container label {
        margin-bottom: 10px;
        color: #555;
    }
    .input-container input {
        padding:10px;
        border: 1px solid #e8e8e8;
    }
</style>