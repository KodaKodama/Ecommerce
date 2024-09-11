import React from 'react'
import { Link } from 'react-router-dom';

function ProductList({product}) {
    console.log(product);
    
    return (
    <div className='product-card'>
        <img src={product.images.url} alt="" />
        <div className="product-box">
            <h2 title= {product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
        </div>
        <div className="row_btn">
            <Link id='btn_buy' to={`#!`}>
            Buy Now
            </Link>
            <Link id='btn_view' to={`detail/${product._id}`}>
            view
            </Link>
        </div>
    </div>
  )
}

export default ProductList