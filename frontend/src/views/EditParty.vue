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
            componentKey: 0,
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