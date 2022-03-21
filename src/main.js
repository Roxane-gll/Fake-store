import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state () {
      return {
        listFakeObject: [],
        listCartObject: []
      }
    },
    mutations: {
      initObject(state, list) {
          state.listFakeObject = list
      },
      addCart(state, newObj) {
          state.listCartObject.push(newObj)
      },
      removeCart(state, removeObj) {
        let index = state.listCartObject.findIndex(product => product === removeObj)
        state.listCartObject[index].quantity = 0
        state.listCartObject.splice(index, 1)
      },
      changeQuantity(state, id, action) {
        let index = state.listCartObject.findIndex(product => product.id === id)
        if (action === "-"){
            state.listCartObject[index].quantity--
        } else {
            state.listCartObject[index].quantity++
        }
        
      }
    }
  })

const app = createApp(App).use(store)
app.mount('#app')
