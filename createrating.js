const fs = require('fs')
const axios = require('axios')
const data = fs.readFileSync('./_data/rating/rating.json', {
  encoding: 'utf8',
  flag: 'r',
})
const parseData = JSON.parse(data)
const ratingJson = []
const generateFile = (data) => {
  data.tools.map((item) => {
    axios
      .get(
        `https://ratingapi-main.netlify.app/.netlify/functions/api/v1/${item.name}/rating`
      )
      .then((response) => {
        const item = {
          name: response.data.feature,
          rating: response.data.rating,
          votes: response.data.votes,
        }
        ratingJson.push(item)
        fs.writeFileSync(
          './_data/rating/rating.json',
          `{"tools":${JSON.stringify(ratingJson)}}`
        )
      })
      .catch((error) => {
        console.log(error.message)
      })
  })
}
generateFile(parseData)


// copying _data folder in root/
const fsExtra = require("fs-extra")
let source = '_data'
let destination = 'data'

fsExtra.copy(source, destination, function (err) {
  console.log('Copy completed!')
});