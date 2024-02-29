import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Category() {
  const [categoryList, setCategory] = useState([])

  async function getCategory() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategory(data.data)
  }
  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div className='row row-cols-1 row-cols-md-3 g-4 key={category._id} my-5 '>

      {categoryList.map((category) => {
        return <div className="col">
            <div className="card cate">
              <img src={category.image} className='w-150' alt="" height={400} />
              <p className='text-success fs-4 fw-5 text-center'>{category.name}</p>
            </div>
          </div>
        
      })}

    </div>
  )
}
