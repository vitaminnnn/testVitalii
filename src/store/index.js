import { createStore } from 'vuex'
import sidebar from '@/store/modules/sidebar'
import config from '@/store/modules/config'

const store = createStore({
  modules: {
    sidebar,
    config
  }
})

export default store
