export default {
  name: 'app-header',
  template: `
        <header>
            <div class="logo">
                <router-link @click.native="scrollToTop" to="/" class="logo-link">
                    <p>AppSus</p>
                </router-link>
            </div>
            <nav class="main-nav">
                <router-link @click.native="scrollToTop" to='/' active-class="active-link" exact>Home</router-link>
                <router-link @click.native="scrollToTop" to='/mail/inbox' active-class="active-link">Mail</router-link>
                <router-link @click.native="scrollToTop" to='/keep' active-class="active-link">Keep</router-link>
                <router-link @click.native="scrollToTop" to='/book' active-class="active-link">Books</router-link>
                <router-link @click.native="scrollToTop" to='/about' active-class="active-link">About</router-link>
            </nav>
        </header>
    `,
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
