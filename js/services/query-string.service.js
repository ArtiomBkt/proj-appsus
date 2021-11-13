export const queryService = {
  noteToMail,
  mailToNote,
}

function noteToMail(subject, body) {
  const url = `mail/drafts/compose?subject=${subject}&body=${body}`
  return url
}

function mailToNote(title, body) {
  const url = `/keep?title=${title}&body=${body}`
  return url
}
