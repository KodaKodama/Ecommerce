
const categoryController = {
    getCategory: async(req, res)=> {
        try{
            const categories = await Category.find();
            res.json(categories);

        }catch(err){
            res.status(500).json({msg: err.message});
        }
    },
}

module.exports = categoryController;