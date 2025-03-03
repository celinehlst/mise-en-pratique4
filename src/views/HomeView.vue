<script setup>
import axios from 'axios'
import { onMounted, ref, inject } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:1337/api/images?populate[0]=url')
    imagesList.value = data.data
    console.log(imagesList.value)
    // console.log(imagesList.value[1].attributes.url.data[0].attributes.url)
    loading.value = false
  } catch (error) {
    console.log(error)
  }
  // Store.userToken.value = $cookies.get('token')
})

const imagesList = ref([])
const loading = ref(true)
const Store = inject('Store')

const addToken = () => {
  $cookies.set('token', 'coucou')
  Store.userToken.value = $cookies.get('token')
  console.log(Store.userToken.value)
}

const deleteToken = () => {
  if (Store.userToken.value) {
    $cookies.remove('token')
    alert('Le token a bien été retiré')
  } else {
    alert("Il n'y a pas de token")
  }
}
</script>

<template>
  <main>
    <h1>Liste d'images</h1>
    <div v-if="loading">Chargement en cours</div>
    <div v-else>
      <div id="image-grid">
        <div v-for="image in imagesList" :key="image.id">
          <img
            v-if="image.attributes.url.data"
            :src="image.attributes.url.data[0].attributes.url"
            alt=""
          />
          <!-- <p>{{ image.attributes.url.data.attributes.url }}</p> -->
          <h2>{{ image.attributes.title }}</h2>
          <p>{{ image.attributes.price }}€</p>
          <RouterLink :to="{ name: 'payment', params: { id: image.id } }"
            ><button>Acheter {{ image.id }}</button></RouterLink
          >
        </div>
      </div>
      <div id="buttons">
        <RouterLink :to="{ name: 'create' }">
          <button>Ajouter une image</button>
        </RouterLink>
        <button @click="addToken">Ajouter un token</button>
        <button @click="deleteToken">Retirer le token</button>
      </div>

      <!-- <button @click="Store.updateUserToken('coucou')">Ajouter un token</button>
      <button @click="Store.updateUserToken('')">Retirer le token</button> -->
    </div>
  </main>
</template>

<style scoped>
h1 {
  margin: 20px;
}

#image-grid {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 50px;
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

#buttons {
  margin: 0px 20px;
}
</style>
