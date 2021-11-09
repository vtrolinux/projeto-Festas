<template>
    <div class="dashboard">
        <div class="title-container">
            <h1>Gerencie seus eventos</h1>
            <router-link to='/newparty' class='btn'>Cadastrar Festa</router-link>
        </div>
        <div v-if='parties.length > 0 '>
            <h1>Tabela de Festa</h1>
            <DataTable :parties='parties' />
        </div>
        <div v-else>
            <p>Você ainda não possui festas cadastradas, <router-link to='/newparty'>clique aqui para criar a sua festa!</router-link></p>
        </div>
    </div>
</template>

<script>
import DataTable from '../components/DataTable.vue'
    export default {
        data() {
            return {
                parties: []
            }
        },
        created(){
            //lifecycle hook
            this.getParties()
        },components:{
            DataTable
        },
        methods: {
            async getParties() {
                const token = this.$store.getters.token
                const url = 'http://localhost:3000/api/party/userparties'
                const fetchOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/Json',
                        'auth-token': token
                    }
                }
                await fetch(url, fetchOptions)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    this.parties = data.parties
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .dashboard {
        padding:50px;
        padding-bottom: 100px;
    }
    .title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    .btn {
        padding: 10px 16px;
        background-color: #000;
        color: #fff;
        margin: 5px;
        text-decoration: none;
        border:none;
        cursor: pointer;
        font-size: 14px;
        transition: .5s;
    }
    .btn:hover {
        background-color: #141619;
    }
</style>
