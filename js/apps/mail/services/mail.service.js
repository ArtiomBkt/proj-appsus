import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAILS_KEY = 'emails'

const loggedinUser = { email: 'basel@appsus.com', fullname: 'Basel Boulos' }
var gMails
createEmails()

export const mailService = {
  query,
  getMailById,
  readMail,
  removeEmail,
  composeMail,
  toggleStar,
  toggleRead,
}

function createEmails() {
  let gMails = utilService.loadFromStorage(MAILS_KEY)
  if (!gMails || !gMails.length) {
    gMails = [
      {
        id: 'e101',
        title: 'First Mail',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isStarred: false,
      },
      {
        id: 'e102',
        title: 'Second Mail',
        subject: 'This is appSus!',
        body: 'No time for missing me',
        isRead: false,
        sentAt: 1551133930594,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isStarred: false,
      },
      {
        id: 'e103',
        title: 'Third Mail',
        subject: 'Much love for sprints',
        body: 'oh yeah much love',
        isRead: false,
        sentAt: 1551133930594,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isStarred: false,
      },
    ]
    utilService.saveToStorage(MAILS_KEY, gMails)
  }
  return gMails
}

function query() {
  return storageService.query(MAILS_KEY)
}

function save(mail) {
  if (mail.id) return storageService.put(MAILS_KEY, mail)
  else return storageService.post(MAILS_KEY, mail)
}

function getMailById(mailId) {
  return storageService.get(MAILS_KEY, mailId)
}

function readMail(mailId) {
  return storageService.get(MAILS_KEY, mailId).then((mail) => {
    mail.isRead = true
    return save(mail)
  })
}

function removeEmail(mailId) {
  return storageService.remove(MAILS_KEY, mailId)
}

function composeMail(mail) {
  mail.isRead = false
  mail.sentAt = Date.now()
  mail.from = loggedinUser.email
  return save(mail)
}

function toggleStar(mailId) {
  return getMailById(mailId).then((mail) => {
    mail.isStarred = !mail.isStarred
    return save(mail)
  })
}

function toggleRead(mailId) {
  return getMailById(mailId).then((mail) => {
    mail.isRead = !mail.isRead
    return save(mail)
  })
}
