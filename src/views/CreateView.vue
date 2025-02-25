<script setup>
import { ref } from 'vue'

const title = ref('')
const url = ref(null)

const handleSubmit = () => {}
</script>
<template>
  <h1>Ajoute ton image</h1>

  <form @submit="handleSubmit">
    <label for="">Titre :</label>
    <input type="text" name="title" id="title" v-model="title" />
    <input
      type="file"
      name="picture"
      id="picture"
      @input="
        (event) => {
          picture = event.target.file[0]
        }
      "
    />
    <button>Valider</button>
  </form>
  <button>Retour à l'accueil</button>
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
