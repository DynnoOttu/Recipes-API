const{insertData,getData,updateData,deleteData} = require('./../models/recipes')

const RecipesController = {
    inputRecipes: async (req,res,next)=>{
        let data = {}
        data.title = req.body.title
        data.photo = req.body.photo
        data.users_id = req.body.users_id
        data.ingredients = req.body.ingredients
        data.category_id = req.body.category_id
        data.slug = req.body.slug
        
        let result = await insertData(data)

        if(!result){
            res.status(404).json({status:404,message:`input data failed`})
        }

        res.status(200).json({status:200,message:`input data success `})

    },
    getRecipes: async (req,res,next) =>{
        let {searchBy,search,sortBy,sort} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC'
        }
        let result = await getData(data)

        if(!result){
            res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success`, data:result.rows})
    },   
    putRecipes: async(req,res,next)=>{
        let id = req.params.id
        let title = req.body.title
        let ingredients = req.body.ingredients
        let photo = req.body.photo
  
        let result = await updateData(id,title,ingredients,photo)
  
        if(!result){
            res.status(404).json({status:404,message:`data input not found`})
        }
  
        res.status(200).json({status:200,message:`update data success`})
    },
    deleteData: async(req,res,next)=>{
        let id = req.params.id
        let result = await deleteData(id)
    
        console.log(result)
        
        if(!result){
            res.status(404).json({status:404,message:`delete data failed`})
        }
    
        res.status(200).json({status:200,message:`delete data success`,data:`${id} deleted`})
    
    }
}

module.exports = RecipesController