import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAILS_KEY = 'emails'

const loggedinUser = { email: 'basel@appsus.com', fullname: 'Basel Boulos' }
var gMails
createEmails()

export const mailService = { query, getMailById, readMail, removeEmail }

function createEmails() {
  let gMails = utilService.loadFromStorage(MAILS_KEY)
  if (!gMails || !gMails.length) {
    gMails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: 'e102',
        subject: 'This is appSus!',
        body: 'No time for missing me',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: 'e103',
        subject: 'Much love for sprints',
        body: 'oh yeah much love',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: 'e104',
        subject: '5 pm bla bla bla',
        body: 'time for telllletubies',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
    ]
    utilService.saveToStorage(MAILS_KEY, gMails)
  }
  return gMails
}

function query() {
  return storageService.query(MAILS_KEY)

  //   return storageService.query(BOOKS_KEY)

  // The emailService query function should get a criteria object,
  // not sure yet what this function should return
  // it returns the mails depend on the criteria maybe ??

  //   const criteria = {
  //     status: '',
  //     txt: '',
  //     isRead: true,
  //     isStared: true,
  //     label: ['important', 'business'],
  //   }
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
