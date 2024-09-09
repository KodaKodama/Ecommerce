const Products = require('../models/productModel');

// filter, sorting, pagination
class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} 


        const excluededFields = ['page','sort','limit']
        excluededFields.forEach(el => delete(queryObj[el]))


        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')

            this.query = this.query.sort(sortBy)

            console.log(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    pagination(){
        const page = this.queryString.page * 1 || 1;

        const limit =  this.queryString.limit * 1 || 9;

        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

const productController = {
    getProducts: async(req, res) => {
        try{
            const features = new APIfeatures(Products.find(),req.query).filtering().sorting().pagination()
            const products = await features.query
            res.json(products)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports= productController;