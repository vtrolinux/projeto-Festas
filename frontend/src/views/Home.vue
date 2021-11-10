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
      <div class="party-container">
        <div class="party-img"></div>
        <router-link to="/linkfesta" class='party-title'>Título da festa</router-link>
        <p class='party-date'>Data: 10/05/2023</p>
        <router-link to= '/linkfesta' class='party-details-btn'>Ver Mais</router-link>
      </div>
      <div class="party-container">
        <div class="party-img"></div>
        <router-link to="/linkfesta" class='party-title'>Título da festa</router-link>
        <p class='party-date'>Data: 10/05/2023</p>
        <router-link to= '/linkfesta' class='party-details-btn'>Ver Mais</router-link>
      </div>
      <div class="party-container">
        <div class="party-img"></div>
        <router-link to="/linkfesta" class='party-title'>Título da festa</router-link>
        <p class='party-date'>Data: 10/05/2023</p>
        <router-link to= '/linkfesta' class='party-details-btn'>Ver Mais</router-link>
      </div>
      <div class="party-container">
        <div class="party-img"></div>
        <router-link to="/linkfesta" class='party-title'>Título da festa</router-link>
        <p class='party-date'>Data: 10/05/2023</p>
        <router-link to= '/linkfesta' class='party-details-btn'>Ver Mais</router-link>
      </div>
      <div class="party-container">
        <div class="party-img"></div>
        <router-link to="/linkfesta" class='party-title'>Título da festa</router-link>
        <p class='party-date'>Data: 10/05/2023</p>
        <router-link to= '/linkfesta' class='party-details-btn'>Ver Mais</router-link>
      </div>
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
  .home {
    padding-top: 40px;
    padding-bottom: 100px;
    text-align: center;
  }
  .h1 {
    margin-bottom: 40px;
  }
  .parties-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;
  }
  .party-container {
    width: 30.3%;
    margin: 1.5%;
    display: flex;
    flex-direction: column;
  }
  .party-img {
    width: 100%;
    height: 200px;
    background-color: #CCC;
    margin-bottom: 12px;
    background-position: center;
    background-size: cover;
  }
  .party-title {
    color: #25282E;
    text-decoration: none;
    margin-bottom: 12px;
  }
  .party-date {
    color: #777;
    margin-bottom: 12px;
  }
  .party-details-btn {
    width: 100%;
    text-transform: uppercase;
    color: #FFF;
    background-color: #25282E;
    transition: .5s;
    border: 0;
    padding: 12px;
    text-decoration: none;
    text-align: center;
  }
  .party-details-btn:hover {
    background-color: #141619;
  }

</style>