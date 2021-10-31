<template>
    <div>
        <Message :msg='msg' :msgClass='msgClass'/>
        <form id="user-form" @submit="page ==='register' ? register($event) : update($event)">
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
    name: 'RegisterForm',
    data(){
        return {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            msg: null,
            msgClass: null
        }
    },
    props: ['user','page','btnText'],
    components: {
        InputSubmit,
        Message
    },
    methods: {
        async register(e){

            e.preventDefault() //nao da refresh quando envia o formulario
            console.log('funcionando vue method')

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