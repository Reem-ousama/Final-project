import React from 'react'
import Products from '../Products/Products'
import Category from '../Category/Category'
import HomeSlider from '../slider/slider'

export default function Home() {
  return (
    <div>
      <div className='my-4'><HomeSlider/></div>
      <div className='my-5'><Category/></div>
      
      <h2>Prouducts</h2>
      <Products/>
    </div>
  )
}
