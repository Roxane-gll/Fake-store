<template>
    <div class="grid grid-col-4 gap-4">
      <div v-for="object in fakeObjects" :key="object.id" :refs="object.id" class="m-max flex items-center justify-between" :class="isInCart(object.id) ? 'border border-cyan-500': 'border border-gray-500'">
        <div><a :href="'#/details?id='+object.id"><img :src="object.image" class="w-36"></a></div>
        <div class="m-2">{{object.title}}</div>
        <div>{{object.price}}</div>
        <div><button @click="addToCart(object.id)"  class="border border-cyan-500 rounded-xl p-2">{{ isInCart(object.id) ? 'Remove' : 'Add' }} to cart</button></div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductTable',
  data() {
    return {
      fakeObjects: []
    }
  },
  computed: {
    listCart() {
      return this.$store.state.listCartObject
    }
  },
  created() {
    this.articles()
  },
  methods: {
    async articles() {
      let response = await axios.get('https://fakestoreapi.com/products')
      this.fakeObjects = response.data
      this.$store.commit('initObject', response.data)
    },
    addToCart(id) {
      let inList = this.listCart.findIndex(product => product.id === id)
      let object = this.fakeObjects.find(product => product.id === id)
      if (inList === -1) {
        object.quantity = 1
        this.$store.commit('addCart', object)
      } else {
        object.quantity = 0
        this.$store.commit('removeCart', object)
      }
    },
    isInCart(id){
      return this.listCart.findIndex(product => product.id === id) !== -1
    }
  }

}
</script>
