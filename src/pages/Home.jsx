import React, { useEffect, useState } from "react";
import DatabasesServices from "../appwrite/configureappwrite";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import UserServices from "../appwrite/UserServices";
import { setAllPosts } from "../features/PostsSlice";

function Home() {
  const [posts, setposts] = useState([]);
  const postslice = useSelector((state) => state.postslice);
  const [loading, setloading] = useState(true);
  const logedinuser = useSelector((state) => state.auth);
  const userfollowing = useSelector((state) => state.auth).userfollowing;
  const userpost = useSelector((state) => state.auth).usserposts;
  const dispatch=useDispatch();
  const userfollowers = useSelector((state) => state.auth).userfollowers;


  useEffect(() => {
    console.log("post" + userfollowing);
   
      DatabasesServices.getPosts(false).then((allpost)=>{
        if(allpost)
        dispatch(setAllPosts({AllPosts:allpost.documents}))
        setposts(allpost.documents.filter((e)=>e.status==="Public").sort((a,b)=>{
          if(a.$createdAt>b.$createdAt){
            return -1;
          }else return 1;
        }));
        setloading(false);
      })
  
    

 
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  if (!logedinuser.isLogedin? logedinuser.isLogedin:false) {
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
    );
  }

  if (posts.length <= 0&!loading) {
    return (
      <Container>
        <h1 className="text-white">No Public Posts Available Add your's or try following people 😄</h1>
      </Container>
    );
  }
    if(posts.length>0&!loading&&logedinuser.isLogedin? logedinuser.isLogedin:false)return (
      <Container>
        <div className="flex  w-full  flex-col items-center h-full mb-14  overflow-y-scroll ">
          {posts.map((e) => (
            <div key={e.$id} className="p-2 bg-black">
              <PostCard
                $id={e.$id}
                articleimage={e.articleimage}
                userid={e.userid}
                title={e.title}
              />
            </div>
          ))}
        </div>
      </Container>
    );

  
   
}

export default Home;
