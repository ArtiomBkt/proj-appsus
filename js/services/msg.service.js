import { eventBus } from "./event-bus.service.js"

export function sendMsg(type, txt, link = '') {
    const msg = {
        txt,
        type,
        link
    }
    eventBus.$emit('showMsg', msg)
}