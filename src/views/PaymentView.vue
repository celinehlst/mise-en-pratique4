<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({ id: String })
console.log(props)

// onMounted(async () => {
//   try {
//     const { data } = await axios.get(`http://localhost:1337/api/images/${props.id}?populate[0]=url`)
//     console.log(data)
//   } catch (error) {
//     console.log(error)
//   }
// })
</script>
<template>Payment View</template>
<style scoped></style>
