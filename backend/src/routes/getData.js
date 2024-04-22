const {Router} = require('express')
const router = Router()
const {getAllRest,searchData,searchSuggestion,menu,cuisines} = require('../controllers/getData')

router.get('/restaurants',getAllRest)
router.get('/search',searchData)
router.get('/searchSuggest',searchSuggestion)
router.get('/menu',menu)
router.get('/cuisine',cuisines)

module.exports = router