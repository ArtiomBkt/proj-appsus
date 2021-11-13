export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  getRandInt,
  makeLorem,
  randomDate,
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function getRandInt(min = 15, max = 150) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function makeLorem(size = 50) {
  const loremStr = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab itaque quasi modi consectetur omnis nemo, 
    enim numquam ex. Soluta nostrum ducimus aut maiores voluptatibus asperiores mollitia repellat! Quibusdam, 
    velit dolore corporis delectus eius voluptates. Voluptas delectus nostrum facilis accusamus praesentium magnam pariatur
     quidem corporis quod inventore! Sed, necessitatibus voluptate, quis vero architecto tenetur quo, aperiam rerum quas 
     optio ea enim voluptatibus non ipsum ipsam! Nihil animi mollitia et saepe, possimus natus odio fuga eos omnis, 
     nemo vel dolorum itaque id beatae facilis quibusdam? Optio deserunt error fuga ipsam ipsa atque dolorem aut 
     laborum blanditiis in consectetur expedita, corporis libero ullam doloremque temporibus? Culpa beatae quas laboriosam
    mollitia vitae iusto ipsum molestiae illo corporis commodi eligendi 
    accusamus et eum rem consequatur neque laudantium quae ad doloribus, natus officia expedita exercitationem.`

  const words = loremStr.split(' ')
  let txt = ''

  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * (words.length - 1))] + ' '
  }
  return txt
}

function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString()
}
