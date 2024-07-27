import React, { useEffect,useState } from 'react'
import UserServices from '../appwrite/UserServices'
import Loading from './Loading';
import { Link } from 'react-router-dom';

function ProfileCard({userid}) {
    const [profiledata, setprofiledata] = useState({});
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        UserServices.getProfile(userid).then((data)=>{
            if(data){
                setprofiledata(data);
                setloading(false);
            }
        })
    },[])

    if (loading) {
        return (
          
            <Loading />
          
        );
    } 
  return (
    
        <Link className='flex gap-2 items-center' to={`/profile/${userid}`}>
          <img className='w-10 h-10 rounded-full' src={UserServices.PreviewProfilePhoto(profiledata.profilephoto)} alt="profilephoto" />
          <h1 className='text-lg font-bold'>{profiledata.username? profiledata.username:"profile not found"}</h1>

          </Link>
  )
}

export default ProfileCard