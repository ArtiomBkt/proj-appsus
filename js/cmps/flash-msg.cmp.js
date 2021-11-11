import { eventBus } from './../services/event-bus.service.js'

export default {
    name: 'flash-msg',
    template: `
    <transition name="fade">
        <div v-if="msg" class="flash-msg" :class="msg.type">
            <p>{{ msg.txt }}</p>
            <!-- <template v-if="msg.link.length > 1">
                <router-link :to="msg.link">Check it out</router-link>
            </template> -->
        </div>
    </transition>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('showMsg', this.showMsg)
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => this.msg = null, 3000)
        }
    }
}