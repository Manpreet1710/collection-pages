const fs = require('fs')
const axios = require('axios')
const fsExtra = require("fs-extra")
const data = fs.readFileSync('./_data/rating/entry.json', {
  encoding: 'utf8',
  flag: 'r',
})

// let source = '_data'
// let destination = 'data'
// fsExtra.copy(source, destination, function (err) {
//   console.log('Copy completed!')
// });
const parseData = JSON.parse(data)

const generateFile = (data) => {
  data.map((item) => {
    axios({
      method: 'post',
      url: `https://ratingapi-main.netlify.app/.netlify/functions/api/v1/feature/create`,
      data: {
        website: item.website,
        feature: item.feature,
      },
    })
  })
}
generateFile(parseData)
