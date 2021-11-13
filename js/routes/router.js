import homePage from './../views/app-home.cmp.js'
import aboutPage from './../views/app-about.cmp.js'
import mailPage from './../apps/mail/views/mail-index.cmp.js'
import keepPage from './../apps/keep/views/note-index.cmp.js'
import bookPage from './../apps/book/views/book-index.cmp.js'
import bookDetails from './../apps/book/views/book-details.cmp.js'

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
    children: [
      {
        name: 'inbox',
        path: 'inbox',
      },
      {
        name: 'starred',
        path: 'starred',
      },
      {
        name: 'sent',
        path: 'sent',
      },
      {
        name: 'drafts',
        path: 'drafts',
        children: [
          {
            name: 'compose',
            path: 'compose',
          },
        ],
      },
      {
        name: 'trash',
        path: 'trash',
      },
      {
        name: 'read',
        path: 'read',
      },
      {
        name: 'unread',
        path: 'unread',
      },
    ],
  },
  {
    path: '/keep',
    component: keepPage,
  },
  {
    path: '/book',
    component: bookPage,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
]

export const router = new VueRouter({ routes })
