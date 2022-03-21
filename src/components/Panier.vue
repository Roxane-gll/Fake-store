<template>
    <div class="grid grid-col-4 gap-4">
      <div v-for="object in listCart" :key="object.id" :refs="object.id" class="m-max flex items-center justify-between border border-gray-500">
        <div><a :href="'#/details?id='+object.id"><img :src="object.image" class="w-36"></a></div>
        <div class="m-2">{{object.title}}</div>
        <div>{{objectPrice(object)}}</div>
        <div>
          <button @click="removeToCart(object.id)"  class="border border-cyan-500 rounded-xl p-2">Remove to cart</button>
          <button class="border border-cyan-500 rounded-xl p-2 ml-1" @click="removeQuantity(object.id)"> - </button>
          <p class="border border-cyan-500 rounded-xl p-2 inline w-fit">{{ object.quantity }}</p>
          <button class="border border-cyan-500 rounded-xl p-2 mr-1" @click="addQuantity(object.id)"> + </button>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Panier',
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
  methods: {
    removeToCart(id) {
      let inList = this.listCart.findIndex(product => product.id === id)
      this.$store.commit('removeCart', this.listCart[inList])
    },
    addQuantity(id) {
      let inList = this.listCart.findIndex(product => product.id === id)
      this.listCart[inList].quantity++
      this.objectPrice(this.listCart[inList])
    },
    removeQuantity(id) {
      let inList = this.listCart.findIndex(product => product.id === id)
      if (this.listCart[inList].quantity > 1){
        this.listCart[inList].quantity--
        this.objectPrice(this.listCart[inList])
      } else {
        this.removeToCart(id)
      }
    },
    objectPrice(object) {
      return object.price * object.quantity
    }
  }
}
</script>