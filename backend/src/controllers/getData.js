const fetchData = require('../utils/fetchData')

const getAllRest = async(req,res) => {

    const Restaurant_Api = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.6339793&lng=74.8722642&page_type=DESKTOP_WEB_LISTING'
    const response = await fetchData(Restaurant_Api) 
    if(response === 'fail to fetch') res.status(404).json({msg:response + 'restautant list'})
    return res.json(response)

}

const searchData = async(req,res) => {

    const selectedPLTab= req.query.selectedPLTab
    const val = selectedPLTab === 'RESTAURANT' || selectedPLTab === 'DISH' ? true : false
    const Search_Api = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=31.6339793&lng=74.8722642&str=${req.query.str}&trackingId=29c30e48-82e0-c583-9971-0803067c7309&submitAction=ENTER&queryUniqueId=935c4e1c-5bbf-6c0d-7c8e-d3327911ecb7${val ? `&selectedPLTab=${selectedPLTab}` : ''}`
    const response = await fetchData(Search_Api) 
    if(response === 'fail to fetch') res.status(404).json({msg:response + 'search list'})
    return res.json(response)

}

const searchSuggestion = async(req,res)=>{
    
    const Suggest_Api = `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=31.6339793&lng=74.8722642&str=${req.query.str}&trackingId=undefined`
    const response = await fetchData(Suggest_Api) 
    if(response === 'fail to fetch') res.status(404).json({msg:response + 'search sugggest'})
    return res.json(response)

}

const menu = async(req,res)=>{
    
    const menuId = req.query.restaurantId
    const Menu_Api = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=31.6339793&lng=74.8722642&restaurantId=${menuId}`
    const response = await fetchData(Menu_Api) 
    if(response === 'fail to fetch') res.status(404).json({msg:response + 'menu'})
    return res.json(response)

}

const cuisines = async(req,res)=>{
    
    const collectionId = req.query.collection
    const tagVal = req.query.tags
    const Cuisine_Api = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.6339793&lng=74.8722642&collection=${collectionId}&tags=${tagVal}&type=rcv2`
    const response = await fetchData(Cuisine_Api) 
    if(response === 'fail to fetch') res.status(404).json({msg:response + 'menu'})
    return res.json(response)

}

module.exports = {getAllRest,searchData,searchSuggestion,menu,cuisines}