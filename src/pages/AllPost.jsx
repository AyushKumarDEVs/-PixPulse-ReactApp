import React, { useEffect, useState } from 'react'
import DatabasesServices from '../appwrite/configureappwrite';
import PostCard from '../components/PostCard';
import Container from '../components/container/Container';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setAllPosts } from '../features/PostsSlice';

function AllPost() {
  const [postlist, setpostlist] = useState([]);
  const postslice=useSelector(state=>state.postslice);
  const [loading, setloading] = useState(true);
  const userpost = useSelector((state) => state.auth).usserposts;
  const logedinuser = useSelector((state) => state.auth).userdata;
  const dispatch=useDispatch();
  
  useEffect(()=>{
    DatabasesServices.getPosts(false).then((allpost)=>{
        if(allpost)
        dispatch(setAllPosts({AllPosts:allpost.documents}))
      })
    if(postslice.AllPosts&&userpost.length>0&&logedinuser){
        if(postslice.AllPosts.length>0){
            setpostlist([...postslice.AllPosts.filter((e)=>e.status==="Public"&&e.userid!=logedinuser.$id),...userpost.filter((e)=>e.status!=="Private")].sort((a,b)=>{
                if(a.$createdAt>b.$createdAt){
                  return -1;
                }else if(b.$createdAt>a.$createdAt) return 1;
                else{
                  return 0;
                }
              }));

        }
        setloading(false);

       
    }else if(postlist.length>=0){
        setloading(false);

    }else{
        setloading(true);
    }
},[postslice.AllPosts,userpost])

    if(loading){
        return (<Container>
            <Loading/>
        </Container>)
    }


    if(postlist.length<=0){
        return <Container>
            <h1 className='text-white'>No post available Add your's 😄</h1>
        </Container>
    }


  return (
   

    
      <Container>
      <div className='flex  w-full  flex-col items-center h-full '>
        <div className='flex  w-full  flex-col items-center h-full mb-14 overflow-y-scroll'>
        {postlist.map((e) => (
              <div key={e.$id} className='p-2 bg-black '>
                  <PostCard $id={e.$id} userid={e.userid} articleimage={e.articleimage} title={e.title} />
              </div>
          ))}

        </div>
          
      </div>

  </Container>
    
  )
}

export default AllPost