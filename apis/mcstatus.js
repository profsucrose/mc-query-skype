const axios = require('axios')

module.exports = axios.create({
    baseURL: 'https://api.mcsrvstat.us/2/'
})