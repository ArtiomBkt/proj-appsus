import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { queryService } from './../../../services/query-string.service.js'

const MAILS_KEY = 'emails'

const loggedinUser = [
  { email: 'basel@appsus.com', fullname: 'Basel Boulos' },
  { email: 'artium@appsus.com', fullname: 'Artiom Bukati' },
]
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
  prepareParams,
}

function prepareParams(mail) {
  const title = mail.title
  const body = mail.body
  return queryService.mailToNote(title, body)
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
    if (folder === 'drafts' || folder === 'compose')
      return mails.filter((mail) => mail.isDraft && !mail.isTrash)
    if (folder === 'trash') return mails.filter((mail) => mail.isTrash)
  })
}

function createEmails() {
  gMails = utilService.loadFromStorage(MAILS_KEY)
  if (!gMails || !gMails.length) {
    gMails = []
    for (let i = 0; i < 30; i++) {
      const mail = {
        id: utilService.makeId(),
        title: utilService.makeLorem(10),
        subject: utilService.makeLorem(10),
        body: utilService.makeLorem(50),
        from: loggedinUser[utilService.getRandInt(0, 1)].email,
        to: 'Artium@appsus.com',
        isRead: Math.random() < 0.5,
        isSent: Math.random() < 0.5,
        isStarred: Math.random() < 0.5,
        isDraft: Math.random() < 0.5,
        isTrash: Math.random() < 0.5,
        updatedAt: utilService.randomDate(),
      }
      gMails.push(mail)
    }
    utilService.saveToStorage(MAILS_KEY, gMails)
  }
  return gMails
}

function createMail() {
  const mail = {
    title: '',
    subject: '',
    body: '',
    from: loggedinUser[utilService.getRandInt(0, 1)].email,
    to: '',
    isRead: false,
    isSent: false,
    isStarred: false,
    isDraft: false,
    isTrash: false,
    updatedAt: new Date().toLocaleDateString(),
  }
  return save(mail)
}

function autoSave(mail) {
  mail.isDraft = true
  mail.updatedAt = new Date().toLocaleTimeString()
  return save(mail)
}

function composeMail(mail) {
  mail.isSent = true
  mail.isDraft = false
  mail.updatedAt = new Date().toLocaleDateString()
  return save(mail)
}

function save(mail) {
  if (mail.id) return storageService.put(MAILS_KEY, mail)
  else return storageService.post(MAILS_KEY, mail)
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
      mail.updatedAt = new Date().toLocaleDateString()
      save(mail)
    } else storageService.remove(MAILS_KEY, mailId)
  })
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
