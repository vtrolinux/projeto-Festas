<template>
  <div class="home">
    <h1> Veja as ultimas festas</h1>
    <div class="parties-container">
      <div class="party-container">
        <div class="party-img"></div>
        <router-link to="/linkfesta" class='party-title'>Título da festa</router-link>
        <p class='party-date'>Data: 10/05/2023</p>
        <router-link to= '/linkfesta' class='party-details-btn'>Ver Mais</router-link>
      </div>
    </div>
    <p v-if='parties.length === 0 '>Não há festas registradas...</p>
  </div>
</template>

<script>
export default {
    data(){
    return {
      parties: []
    }
  }
}
</script>

<style scoped>

</style>