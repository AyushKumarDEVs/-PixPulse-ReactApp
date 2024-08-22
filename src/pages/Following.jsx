import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import { useParams } from 'react-router-dom'
import UserServices from '../appwrite/UserServices';
import ProfileCard from '../components/ProfileCard';
import Loading from '../components/Loading';

export default function Following() {
    const {id}=useParams();
    const {username}=useParams();

    const [followinglist, setfollowinglist] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        
        UserServices.listAllFollowing(id).then((data)=>{
            if(data){
                setfollowinglist(data.documents.reverse());
               
                setloading(false);
            }
        })
    },[])

    if (loading) {
        return (
          <Container>
            <Loading />
          </Container>
        );
    }
  return (
    <Container>
        <div className='w-full h-full flex justify-center'>
            <div className=' text-white p-4  bg-slate-800 w-96 h-full flex flex-col  items-center gap-5 '>
                <h1 className='font-bold text-xl mb-10'>{username} Follows Them </h1>

                <div className='overflow-y-scroll w-full h-full flex flex-col justify-start items-start gap-5'>
                {
                    followinglist!=null? followinglist.map((each)=>(
                        
                        <ProfileCard key={each.followingid} userid={each.followingid}/>
                        
                    ))
                    :
                    <h2>{username} do not follow any one</h2>
                }

                </div>
                
                
            </div>
        </div>
    </Container>
  )
}
