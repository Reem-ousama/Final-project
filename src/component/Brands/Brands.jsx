import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brands() {

async function getBrands(){
return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}

let {data , isLoading , isFetching}=useQuery('brands' ,getBrands , {cacheTime:3000})
console.log(data?.data.data)
return (
    <div className='row'>
      <h1 className='text-success text-center my-5' >All Brands</h1>
      {!isLoading ? 
      <>
       {data?.data.data.map((brands)=>{
        return <div className=" brands col-md-3 border gy-3" key={brands._id}>
          <img src={brands.image} className='w-100' height={200} alt={brands.name} />
          <p>{brands.name}</p>
        </div>
      })}
      </>
      :
      <div className=" vh-100 d-flex justify-content-center align-items-center">
      <ColorRing
       visible={true}
       height="80"
       width="80"
       ariaLabel="color-ring-loading"
       wrapperStyle={{}}
       wrapperClass="color-ring-wrapper"
       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
     />
    </div>
      }
     

    </div>
  )
}
