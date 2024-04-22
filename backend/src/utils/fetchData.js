const fetch = require('cross-fetch')

const fetchData = async(api) => {
    
    try{
        const data = await fetch(api, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        })
        const json = await data.json()
        return json
    }
    catch(err){
        return 'fail to fetch'
    }
    
}
module.exports = fetchData
