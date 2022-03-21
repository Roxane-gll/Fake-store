<template>
  <div class="flex items-center">
    <img :src="product.image" class="max-w-sm flex-auto flex">
    <div class="flex-col flex">
      <button @click="addToCart()">{{isInCart() ? 'Remove' : 'Add' }} to cart</button>
      <p>{{product.description}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Detail',
  data() {
    return {
      query: '',
      product: {}
    }
  },
  computed: {
    listCart() {
      return this.$store.state.listCartObject
    }
  },
  created() {
    let route = window.location.hash
    this.query = route.split("?id=")[1]
    this.getProduct()
  },
  methods: {
    async getProduct() {
      let response = await axios.get('https://fakestoreapi.com/products/'+this.query)
      console.log(response.data)
      this.product = response.data
    },
    addToCart() {
      let inList = this.listCart.findIndex(product => product.id === this.product.id)
      if (inList === -1) {
        this.listCart.push(this.product)
      } else {
        this.listCart.splice(inList, 1)
      }
      this.$emit('update:modelValue', this.listCart)
    },
    isInCart(){
      return this.listCart.findIndex(product => product.id === this.product.id) === -1? false :true
    }
  }
}
</script>
