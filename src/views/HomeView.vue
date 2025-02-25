<script setup>
import axios from 'axios'
import { onMounted, ref, inject } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:1337/api/images?populate[0]=url')
    imagesList.value = data.data
    // console.log(imagesList.value)
    // console.log(imagesList.value[1].attributes.url.data[0].attributes.url)
    loading.value = false
  } catch (error) {
    console.log(error)
  }
})

const imagesList = ref([])
const loading = ref(true)
const Store = inject('Store')

// const addToken = () => {
//   $cookies.set('token', 'coucou')
//   Store.userToken.value = $cookies.get('token')
//   console.log(Store.userToken.value)
// }

// const deleteToken = () => {
//   if (Store.userToken.value) {
//     $cookies.remove('token')
//     alert('Le token a bien été retiré')
//   } else {
//     alert("Il n'y a pas de token")
//   }
// }
</script>

<template>
  <main>
    <h1>Liste d'images</h1>
    <div v-if="loading">Chargement en cours</div>
    <div v-else>
      <div v-for="image in imagesList" :key="image.id">
        <img :src="image.attributes.url.data[0].attributes.url" alt="" />
        <!-- <p>{{ image.attributes.url.data.attributes.url }}</p> -->
        <h2>{{ image.attributes.title }}</h2>
      </div>
      <RouterLink :to="{ name: 'create' }">
        <button>Ajouter une image</button>
      </RouterLink>

      <button @click="Store.updateUserToken('coucou')">Ajouter un token</button>
      <button @click="Store.updateUserToken('')">Retirer le token</button>
    </div>
  </main>
</template>

<style scoped>
img {
  width: 100px;
}
</style>
