
import React, { useEffect, useState } from 'react'
import DatabasesServices from '../appwrite/configureappwrite'
import { Link } from 'react-router-dom'
import UserServices from "../appwrite/UserServices"
import Loading from './Loading';
import Container from './container/Container';
function PostCard({$id, title, articleimage,userid}) {
    const [profiledata, setprofiledata] = useState({});
    const [loading, setloading] = useState(true);

    
    useEffect(()=>{
      UserServices.getProfile(userid).then((data)=>{
        if(data){
          setprofiledata(data);
          setloading(false);
        }
      }).catch((e)=>console.log(e));
      articleimage? DatabasesServices.PreviewFile(articleimage):null
    },[])

  return (
    <div>
      {
        loading? (
          <div className='w-48 bg-blue-900 rounded-xl flex flex-col gap-3 justify-center p-4 h-postcard'>
            <Loading />
          </div>
          
        ):
        (
        <div className='w-48 bg-blue-900 rounded-xl flex flex-col gap-3 justify-center p-4 h-postcard sm:h-postcardPC'>
          <Link className='flex gap-2 items-center' to={`/profile/${userid}`}>
          <img className='w-10 h-10 rounded-full' src={UserServices.PreviewProfilePhoto(profiledata.profilephoto)} alt="" />
          <h1 className='text-lg font-bold'>{profiledata? profiledata.username:"profile not found"}</h1>

          </Link>
            <Link to={`/post/${$id}`} className= 'flex gap-3 flex-col justify-center w-full  '>
                <img src={articleimage?DatabasesServices.PreviewFile(articleimage):null} alt={title}
                className='rounded-xl w-full h-40' />
                 <h2
            className='text-xl font-bold'
            >{title}</h2>

            </Link>
           
        </div>)
      }
        
    </div>
  )
}


export default PostCard
