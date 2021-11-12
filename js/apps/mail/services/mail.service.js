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
  getMailMap,
  autoSave,
  createMail,
}

function createEmails() {
  let gMails = utilService.loadFromStorage(MAILS_KEY)
  if (!gMails || !gMails.length) {
    gMails = [
      {
        id: 'e101',
        title: 'What is appsus email ?',
        subject:
          'Appsus email, is the best fucking email you will ever see Appsus email, is the best fucking email you will ever see Appsus email, is the best fucking email you will ever see Appsus email, is the best fucking email you will ever see Appsus email, is the best fucking email you will ever see Appsus email, is the best fucking email you will ever see Appsus email, is the best fucking email you will ever see Appsus email, is the best fucking email you will ever see',
        body: 'Would love to catch up sometimes',
        updatedAt: new Date().toLocaleDateString(),
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
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
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
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e104',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e105',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e106',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e107',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e108',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e109',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e110',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e111',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e112',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e113',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
        isDraft: false,
        isTrash: false,
      },
      {
        id: 'e114',
        title: 'This is trash',
        subject: 'This is the second email you will ever see in appsus okay ?',
        body: 'This is the second email you will ever see in appsus okay ?',
        updatedAt: new Date().toLocaleDateString(),
        from: loggedinUser.email,
        to: 'momo@momo.com',
        isRead: false,
        isSent: false,
        isStarred: true,
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
      return mails.filter((mail) => !mail.isTrash && !mail.isDraft)
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

function getMailMap() {
  const foldersMap = {
    all: 0,
    inbox: 0,
    sent: 0,
    read: 0,
    unread: 0,
    starred: 0,
    drafts: 0,
    trash: 0,
  }
  return storageService.query(MAILS_KEY).then((mails) => {
    mails.reduce((map, mail) => {
      if (!mail.isTrash && !mail.isDraft) map['inbox'] += 1
      if (mail.isSent && !mail.isTrash) map['sent'] += 1
      if (mail.isRead) map['read'] += 1
      if (!mail.isRead) map['unread'] += 1
      if (mail.isStarred && !mail.isTrash) map['starred'] += 1
      if (mail.isDraft && !mail.isTrash) map['drafts'] += 1
      if (mail.isTrash) map['trash'] += 1
      return map
    }, foldersMap)
    foldersMap['all'] = mails.length
    return foldersMap
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
  return getMailById(mailId).then((mail) => {
    if (!mail.isTrash) {
      mail.isTrash = true
      mail.updatedAt = new Date().toLocaleTimeString()
      save(mail)
    } else storageService.remove(MAILS_KEY, mailId)
  })
}

function composeMail(mail) {
  mail.isSent = true
  mail.isRead = false
  mail.isStarred = false
  mail.isDraft = false
  mail.isTrash = false
  mail.updatedAt = new Date().toLocaleTimeString()
  mail.from = loggedinUser.email
  return save(mail)
}

function createMail() {
  const mail = {
    title: '',
    subject: '',
    body: '',
    from: loggedinUser.email,
    to: '',
    isRead: false,
    isSent: false,
    isStarred: false,
    isDraft: false,
    isTrash: false,
  }
  return save(mail)
}

function autoSave(mail) {
  mail.isDraft = true
  mail.updatedAt = new Date().toLocaleTimeString()
  return save(mail)
}

function toggleStar(mailId) {
  return getMailById(mailId).then((mail) => {
    mail.isStarred = !mail.isStarred
    save(mail)
  })
}

function toggleRead(mailId) {
  return getMailById(mailId).then((mail) => {
    mail.isRead = !mail.isRead
    save(mail)
  })
}
