import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import flashMsg from './cmps/flash-msg.cmp.js'
import { router } from './routes/router.js'

const options = {
  el: '#app',
  router,
  name: 'main-app',
  components: {
    appHeader,
    appFooter,
    flashMsg,
  },

  template: `
        <section>
            <flash-msg />
            <app-header />
            <router-view />
            <!-- <app-footer /> -->
        </section> 
        `,
}

new Vue(options)
