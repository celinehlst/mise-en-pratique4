<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51QyZNyGpRI0OuF9VsA3w1ozBjHKKqFywrWcMk3IL39k4S3ROiyuMMp68fXQ1fTBMMakraX1WH0n9Manfkow71DBW00FvQsvQR2',
)
const cardElement = ref(null)
const confirmedPayment = ref(false)

const handlePayment = async () => {
  try {
    const stripe = await stripePromise
    const { token } = await stripe.createToken(cardElement.value)
    const stripeToken = token.id
    const { data } = await axios.post('http://localhost:1337/api/offers/buy', {
      token: stripeToken,
      amount: imageInfos.value.attributes.price,
      title: imageInfos.value.attributes.title,
    })
    if (data.status === 'succeeded') {
      confirmedPayment.value = true
    }
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(async () => {
  const stripe = await stripePromise
  const elements = stripe.elements()
  cardElement.value = elements.create('card', {
    style: {
      base: {
        fontSize: '15px',
        // fontFamily: 'Impact, Haettenschweiler',
        color: 'purple',
        '::placeholder': {
          color: 'grey',
        },
        iconColor: 'grey', // couleur de l'icône carte
      },
      invalid: {
        color: 'blue',
        iconColor: 'gold',
      },
    },
  })
  cardElement.value.mount('#card-element')
})

const props = defineProps({ id: String })
const imageInfos = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(`http://localhost:1337/api/images/${props.id}?populate[0]=url`)

    imageInfos.value = data.data
    console.log(imageInfos.value)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <h1>Achat d'une photo</h1>
  <p v-if="imageInfos">
    Vous achetez la photo <span> "{{ imageInfos.attributes.title }}"</span> à
    <span>{{ imageInfos.attributes.price }}€</span>
  </p>
  <div v-if="!confirmedPayment">
    <div id="card-element"></div>
    <button @click="handlePayment">Payer</button>
  </div>
  <div v-else>
    <p>Paiement confirmé !</p>
  </div>
  <RouterLink :to="{ name: 'home' }"><button>Retour à l'accueil</button></RouterLink>
</template>
<style scoped>
span {
  font-weight: 600;
}
</style>
