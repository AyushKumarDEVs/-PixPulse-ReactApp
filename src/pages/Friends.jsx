import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import { useParams } from 'react-router-dom'
import UserServices from '../appwrite/UserServices';
import ProfileCard from '../components/ProfileCard';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

export default function Friends() {
    const {id}=useParams();
    const {username}=useParams();
    const [userfollowing, setuserfollowing] = useState([])
    const [userfollowers, setuserfollowers] = useState([])    
    const [friendslist, setfriendslist] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        setloading(true);
        UserServices.listAllFollowers(id).then((data)=>{
            if(data){
                    setuserfollowers(data.documents.reverse());
                    UserServices.listAllFollowing(id).then((data)=>{
                        if(data){
                            setuserfollowing(data.documents.reverse());
                         
                            
                        }
                    })
               
               
            }
        })
       
        
    },[])

    useEffect(() => {
        let f1=[];

        if(userfollowers.length>0&&userfollowing.length>0){
            userfollowing.forEach(element => {
                userfollowers.forEach((each)=>{
                    if(element.followingid===each.followerid){
                        console.log("s");
                        f1.push(element.followingid);
                    }
                })
            });
        }
        setfriendslist(f1);
        setloading(false);
    
     
    }, [userfollowers,userfollowing])
    

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
            <div className=' text-white p-4  bg-slate-800  w-96 h-full flex flex-col  items-center gap-5 '>
                <h1 className='font-bold text-xl mb-10'>{username} Friends List</h1>
                <div className='overflow-y-scroll w-full h-full flex flex-col justify-start items-start gap-5'>
                {
                    
                   
                    friendslist.length>0? friendslist.map((each)=>(
                        
                        <ProfileCard key={each} userid={each}/>
                        
                    ))
                    :
                    friendslist.length<=0? <h2>{username} has No Friends 😥</h2> :<h2> Loading Please Wait...</h2>
                }
                </div>
                
            </div>
        </div>
    </Container>
  )
}
