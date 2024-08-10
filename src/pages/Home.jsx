import React, { useEffect, useState } from 'react'
import DatabasesServices from '../appwrite/configureappwrite';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setposts] = useState([]);
    const postslice=useSelector(state=>state.postslice);
    const [loading, setloading] = useState(true);
    const isLogedin=useSelector((state)=>state.auth).isLogedin;
    useEffect(()=>{
        if(postslice.AllPosts&&posts.length<=0){
            if(postslice.AllPosts.length>0){
                setposts(postslice.AllPosts.filter((each)=>each.status==="active"));
                setloading(false);
    
            }
           
        }else if(posts.length>0){
            setloading(false);
    
        }else{
            setloading(true);
        }
    },[postslice.AllPosts])

    if(loading){
        return (
            <Container>
                <Loading/>
            </Container>
            
        )
    }
    if (!isLogedin) {
        return (
            <Container>
                    <div className="text-white h-full w-full flex items-center justify-center">
                        <Link to="/login">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts{isLogedin}
                            </h1>
                        </Link>
                            
                    </div>
                </Container>
        )
    }

    if(posts.length<=0){
        return <Container>
            <h1 className='text-white'>No Active Post Add your's 😄</h1>
           
        </Container>
    }

    return(
       
        <Container>
            <div className='flex  w-full  flex-col items-center h-full overflow-y-scroll '>
                {posts.map((e) => (
                    <div key={e.$id} className='p-2 bg-black'>
                        <PostCard $id={e.$id} articleimage={e.articleimage} userid={e.userid} title={e.title} />
                    </div>
                ))}
            </div>
      
        </Container>
    )
}

export default Home