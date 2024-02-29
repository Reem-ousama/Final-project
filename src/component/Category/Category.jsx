import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function Category() {
  const [categoryList, setCategory] = useState([])

 async function getCategory(){
  let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  setCategory(data.data)
  }
  useEffect(() => {
    getCategory()
  }, [])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <div className='' >
      <Slider {...settings}>
        {categoryList.map((category)=>{
          return <div key={category._id}>
           <img  src={category.image} className='w-100' alt="" height={400} />
           <p>{category.name }</p>
           </div>
        })}
      </Slider>
    </div>
  )
}
