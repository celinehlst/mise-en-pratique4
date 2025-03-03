<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'

const title = ref('')
const price = ref(0)
const url = ref(null)

const handleSubmit = async () => {
  console.log(url.value)

  const formData = new FormData()
  formData.append('files.url', url.value)
  formData.append(
    'data',
    JSON.stringify({
      price: price.value,
      title: title.value,
    }),
  )

  // formData.append('data', JSON.stringify({ price: price.value }))
  // formData.append('data', JSON.stringify({ title: title.value }))

  try {
    const response = await axios.post('http://localhost:1337/api/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

// const imagePreview = computed(() => {
//   return URL.createObjectURL(url.value)
// })
</script>
<template>
  <h1>Ajoute ton image</h1>

  <form @submit.prevent="handleSubmit">
    <label for="title">Titre :</label>
    <input type="text" name="title" id="title" v-model="title" />
    <label for="price">Prix :</label>
    <input type="number" name="price" id="price" v-model="price" />
    <input
      type="file"
      name="picture"
      id="picture"
      @input="
        (event) => {
          url = event.target.files[0]
        }
      "
    />
    <!-- <img v-if="imagePreview" :src="imagePreview" /> -->
    <button>Valider</button>
  </form>
  <RouterLink :to="{ name: 'home' }"><button>Retour à l'accueil</button></RouterLink>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
  margin-bottom: 50px;
}
</style>
