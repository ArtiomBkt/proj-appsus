import { eventBus } from "./event-bus.service.js"

export const msgService = {
    sendMsg
}

function sendMsg(type, txt) {
    const msg = {
        txt,
        type
    }
    eventBus.$emit('showMsg', msg)
}