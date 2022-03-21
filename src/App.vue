<template>
  <div>
    <a href="#/"> home</a>
    <a href="#/panier"><button class="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm" id="panier"><img id="caddie" src="./assets/caddie.png" >{{ listCart.length }}</button></a>
    <component :is="curentView" v-model=listCart></component>
  </div>
</template>

<script>
import axios from 'axios'
import Detail from './components/Detail.vue'
import ProductTable from './components/ProductTable'
import Panier from './components/Panier.vue'

const routes = {
  '/': ProductTable,
  '/details': Detail,
  '/panier': Panier
}

export default {
  name: 'App',
  data() {
    return {
      currentPath: window.location.hash,
    }
  },
  computed: {
    curentView() {
      let path = this.currentPath.slice(1)
      if (this.currentPath.includes('?')){
        path = path.split('?')[0]
      }
      return routes[path || '/']
    },
    listCart() {
      return this.$store.state.listCartObject
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  },
  created() {
    this.articles()
  },
  methods: {
    async articles() {
      let response = await axios.get('https://fakestoreapi.com/products')
      this.fakeObjects = response.data
    },
    addToCart(id) {
      let inList = this.listCart.findIndex(product => product.id === id)
      if (inList === -1) {
        this.listCart.push(this.fakeObjects.find(product => product.id === id))
      } else {
        this.listCart.splice(inList, 1)
      }
      
    },
    isInCart(id){
      let result = this.listCart.findIndex(product => product.id === id)
      if (result=== -1){
        return false
      } else {
        return true
      }
    }
  }

}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#panier{
  display:block;
  position: fixed;
  top: 1vh;
  right: 1vw;
}
#caddie {
  width: 30px;
  height: 30px;
}
</style>
