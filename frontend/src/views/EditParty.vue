<template>
    <div class='editparty'>
        <p>edite sua festa</p>
        <h1>formulario da festa</h1>
        <PartyForm :party='party' page='editparty' btnText='Editar Festa' :key='componentKey' />
    </div>
</template>

<script>
import PartyForm from '../components/PartyForm.vue'
export default {
    components: {
        PartyForm
    },
    data() {
        return {
            party: {},
            componentKey: 0
        }
    },
    created(){
        //load party
        this.getParty()
    },
    methods: {
            async getParty(){
            // pega id da url
            const id = this.$route.params.id
            const token = this.$store.getters.token
            
            console.log('id edit: '+id)

            const url = `http://localhost:3000/api/party/${id}`
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            }
            await fetch(url, fetchOptions)
            .then((resp) => resp.json())
            .then((data) => {
                this.party = data.party
                this.party.partyDate = this.party.partyDate.substring(0,10)// exibe ano/mes/dia

                this.party.photos.forEach((photo, index) => {
                    this.party.photos[index] = photo.replace('public', 'http://localhost:3000')
                })
                this.componentKey += 1 //altera o valor do prop pra atualizar os dados alterando o valor da propriedade
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

}
</script>

<style scoped>
    .editparty {
        text-align: center;
        padding-top: 40px;
        padding-bottom: 100px;
    }
    .editparty h1 {
        margin-bottom: 40px
    }
</style>