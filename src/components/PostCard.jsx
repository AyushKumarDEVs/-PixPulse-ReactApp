
import React, { useEffect, useState } from 'react'
import DatabasesServices from '../appwrite/configureappwrite'
import { Link } from 'react-router-dom'
import UserServices from "../appwrite/UserServices"
import Loading from './Loading';
import Container from './container/Container';
import { data } from 'autoprefixer';
import { useSelector } from 'react-redux';
function PostCard({$id, title, articleimage,userid}) {
    const [profiledata, setprofiledata] = useState({});
    const [loading, setloading] = useState(true);
    const [Title, setTitle] = useState(title)
    const profileslice=useSelector(state=>state.profileslice);
    const allprofile=profileslice.AllProfile;
    useEffect(()=>{
      if(allprofile.filter((e)=>e.$id===userid)[0]){
        setprofiledata(allprofile.filter((e)=>e.$id===userid)[0]);
        console.log(allprofile.filter((e)=>e.$id===userid)[0])
            setloading(false)
      }else{
        setloading(true);
      }
      
      
    },[allprofile])

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
          {profiledata? <img className='w-10 h-10 rounded-full' src={UserServices.PreviewProfilePhoto(profiledata.profilephoto)} alt="" /> :null}
          <h1 className='text-lg font-bold'>{profiledata? profiledata.username:"profile not found"}</h1>

          </Link>
            <Link to={`/post/${$id}`} className= 'flex gap-3 flex-col justify-center w-full  '>
                <img src={articleimage?DatabasesServices.PreviewFile(articleimage):null} alt={Title}
                className='rounded-xl w-full h-40' />
                 <h2
            className='text-xl font-bold'
            >{Title}</h2>

            </Link>
           
        </div>)
      }
        
    </div>
  )
}


export default PostCard
