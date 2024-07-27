import React, { useEffect, useState } from 'react'
import DatabasesServices from '../appwrite/configureappwrite';
import PostCard from '../components/PostCard';
import Container from '../components/container/Container';
import Loading from '../components/Loading';

function AllPost() {
    const [postlist, setpostlist] = useState([])
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        console.log("allposts");
        try {
            DatabasesServices.getPosts(false).then((posts)=>{
                if(posts){
                    
                    setpostlist(posts.documents.reverse());
                    setloading(false);
                }
            })
            
        } catch (error) {
            console.log("error"+error);
        }
    },[])

    if(loading){
        return (<Container>
            <Loading/>
        </Container>)
    }


    if(postlist.length<=0){
        return <Container>
            <h1>No post available Add your's 😄</h1>
        </Container>
    }


  return (
    <>

    {
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
    }
    
    </>
  )
}

export default AllPost