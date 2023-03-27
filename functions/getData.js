const sowpods = require('./Dictonary/sowpods.js')
const swSowpods = require('./Dictonary/en-sowpods')
exports.handler = function (event, context, callback) {
  // your server-side functionalit
  request_data = event['queryStringParameters']
  let data = []
  let name = request_data['name']
  let dictionaryData = []
  let resultArr = []

  if (name) {
    dictionaryData = [...sowpods]
    resultArr = sowpods
    data = swSowpods(name)
  } else {
    data = sowpods
  }

  let newArr = []
  if (name && name.includes('?')) {
    const searchWord = (wordToSearch) => {
      let blankTileCount = wordToSearch.split('').filter((i) => i === '?').length
      wordToSearch = wordToSearch.replace(/\?/g, '')
      dictionaryData.map((word, index) => {
        let missedCase = 0
        let matchedCase = 0
        let searchWord = wordToSearch.split('')
        for (let i = 0; i < searchWord.length; i++) {
          if (word.includes(searchWord[i])) {
            word = word.replace(searchWord[i], '')
            matchedCase++
          }
        }
        missedCase = word.length
        if (matchedCase != 0) {
          if (missedCase <= blankTileCount) {
            newArr.push(resultArr[index])
          }
        }
      })
      newArr = [...new Set(newArr)]
    }
    searchWord(name)
  } else {
    newArr = data
  }

  const send = () => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: JSON.stringify(newArr),
    })
  }
  send()
}
