export const queryService = {
    noteToMail
}

function noteToMail(subject, body) {
    const url = `mail/drafts/compose?subject=${subject}&body=${body}`
    return url
}