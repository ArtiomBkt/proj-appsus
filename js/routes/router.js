import homePage from './../views/app-home.cmp.js'
import aboutPage from './../views/app-about.cmp.js'
import mailPage from './../apps/mail/views/mail-index.cmp.js'
import keepPage from './../apps/keep/views/note-index.cmp.js'
import mailDetails from './../apps/mail/views/mail-details.cmp.js'

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/mail',
    component: mailPage,
  },
  {
    path: '/mail/:mailId',
    component: mailDetails,
  },
  {
    path: '/keep',
    component: keepPage,
  },
]

export const router = new VueRouter({ routes })
