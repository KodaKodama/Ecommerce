import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList';

function Product() {
  const state = useContext(GlobalState);
  // console.log(state.productAPI.products);
  
  const [products] = state.productAPI.products;
  console.log(products);
  
  return (
    <div className='products'>
      {
        products.map(product => {
          return <ProductList key={product.id} product={product} />
        })
      }
    </div>
  )
}

export default Product