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
        title: 'This is inbox',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1636658085448,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: false,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e102',
        title: 'This is starred',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1551133930500,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e103',
        title: 'This is sent',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1551133930500,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: true,
        isStarred: false,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e104',
        title: 'This is drafts',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1551133930500,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: false,
        isDraft: true,
        isTrash: false,
      },
      {
        id: 'e105',
        title: 'This is trash',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1551133930500,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: true,
      },
      {
        id: 'e106',
        title: 'This is read',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1551133930500,
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: true,
        isSent: false,
        isStarred: false,
        isDraft: false,
        isTrash: false,
      },
    ]
    utilService.saveToStorage(MAILS_KEY, gMails)
  }
  return gMails
}

function query(criteria) {
  return storageService.query(MAILS_KEY).then((mails) => {
    const folder = criteria.folder
    if (folder === 'inbox')
      return mails.filter(
        (mail) => !mail.isSent && !mail.isTrash && !mail.isDraft
      )
    if (folder === 'sent')
      return mails.filter((mail) => mail.isSent && !mail.isTrash)
    if (folder === 'read') return mails.filter((mail) => mail.isRead)
    if (folder === 'unread') return mails.filter((mail) => !mail.isRead)
    if (folder === 'starred')
      return mails.filter((mail) => mail.isStarred && !mail.isTrash)
    if (folder === 'drafts')
      return mails.filter((mail) => mail.isDraft && !mail.isTrash)
    if (folder === 'trash') return mails.filter((mail) => mail.isTrash)
  })
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
  getMailById(mailId).then((mail) => {
    if (!mail.isTrash) {
      mail.isTrash = true
      save(mail)
    } else return storageService.remove(MAILS_KEY, mailId)
  })
}

function composeMail(mail) {
  mail.isSent = true
  mail.isRead = false
  mail.isStarred = false
  mail.isDraft = false
  mail.isTrash = false
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
