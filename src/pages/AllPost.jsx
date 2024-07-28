import React, { useEffect, useState } from 'react'
import DatabasesServices from '../appwrite/configureappwrite';
import PostCard from '../components/PostCard';
import Container from '../components/container/Container';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

function AllPost() {
  const [postlist, setpostlist] = useState([]);
  const postslice=useSelector(state=>state.postslice);
  const [loading, setloading] = useState(true);
  
  useEffect(()=>{
    if(postslice.AllPosts){
        if(postslice.AllPosts.length>0){
            setpostlist(postslice.AllPosts);
            setloading(false);

        }
       
    }else{
        setloading(true);

    }
},[postslice.AllPosts])

    if(loading){
        return (<Container>
            <Loading/>
        </Container>)
    }


    if(postlist.length<0){
        return <Container>
            <h1>No post available Add your's 😄</h1>
        </Container>
    }


  return (
   

    
      <Container>
      <div className='flex  w-full  flex-col items-center h-full '>
        <div className='flex  w-full  flex-col items-center h-full overflow-y-scroll'>
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