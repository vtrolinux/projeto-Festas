<template>  
    <div class="party">
        <h1>Titulo da festa</h1>
        <div class="party-container">
            <div class="party-images">
                <div class="main-image"></div>
                <div class="party-mini-images">
                    <div class="mini-image"></div>
                    <div class="mini-image"></div>
                    <div class="mini-image"></div>
                    <div class="mini-image"></div>
                    <div class="mini-image"></div>
                    <div class="mini-image"></div>
                    <div class="mini-image"></div>
                </div>
            </div>
            <div class="party-details">
                <p class="bold">Descrição da Festa:</p>
                <p class="party-description">Alguma descrição da festa: </p>
                <p class="bold">Data da festa:</p>
                <p class="party-date">10/05/2023</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Party'
}
</script>

<style scoped>
    .party {
        text-align: center;
        padding-top: 40px;
        padding-bottom: 100px;
        width: 1000px;
        margin: 0 auto;
    }
    .party h1 {
        margin-bottom: 40px;
    }
    .party-container {
        display: flex;
    }
    .party-images {
        width: 380px;
        margin-right: 30px
    }
    .main-image {
        width: 100%;
        height: 200px;
        background-color: #CCC;
        margin-bottom: 15px;
        background-position: center;
        background-size: cover;
    }
    .party-mini-images {
        display: flex;
        flex-wrap: wrap;
    }
    .mini-image {
        width: 80px;
        height: 80px;
        margin-right: 15px;
        margin-bottom: 15px;
        background-color: #CCC;
        background-position: center;
        background-size: cover;
    }
    .party-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .bold {
        margin-bottom: 12px;
        font-weight: bold;
    }
    .party-description, .party-date {
        margin-bottom: 20px;
    }
</style>