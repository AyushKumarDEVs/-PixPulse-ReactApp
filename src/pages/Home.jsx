import React, { useEffect, useState } from "react";
import DatabasesServices from "../appwrite/configureappwrite";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import UserServices from "../appwrite/UserServices";

function Home() {
  const [posts, setposts] = useState([]);
  const postslice = useSelector((state) => state.postslice);
  const [loading, setloading] = useState(true);
  const logedinuser = useSelector((state) => state.auth);
  const userfollowing = useSelector((state) => state.auth).userfollowing;
  const userpost = useSelector((state) => state.auth).usserposts;

  const userfollowers = useSelector((state) => state.auth).userfollowers;


  useEffect(() => {
    console.log("post" + userfollowing);

    setloading(true)
    if (postslice.AllPosts&&userfollowing.length>=0&&userfollowers.length>=0) {
      let posttoshow = [];
      console.log(userfollowing)
      if (postslice.AllPosts.length > 0) {
        userfollowing.forEach((each) => {
          postslice.AllPosts.forEach((post) => {
            if (post.userid === each.followingid) {
              console.log("xp",post.userid)
              posttoshow.push(post); // Add matching posts to posttoshow
              
            }
            // userfollowers.forEach((eachfollower)=>{
            //     if(eachfollower.followerid===post.userid){
                   
            //         posttoshow.push(post.status==="Friends" ? post:null); // Add matching posts to posttoshow
            
            //     }
            // })
            // userfollowers.forEach((eachfollower)=>{
            //     if(post.userid===eachfollower.followerid){
            //         posttoshow.push(post.status==="Friends" ? post:[]); // Add matching posts to posttoshow

            //     }
            //   })
          });
          
        });
        let friendspost=[];//friends post of friends
        let publicpost=posttoshow.filter((each)=>each.status==="Public");//public post of all following
        userfollowers.forEach((eachfollower)=>{
          posttoshow.forEach((eachpost)=>{
            if(eachfollower.followerid===eachpost.userid){
              if(eachpost.status==="Friends"){
                friendspost.push(eachpost);
              }
              
            }
            })
          })
        
          console.log(friendspost)
        
        
        setposts([...friendspost,...publicpost,...userpost.filter((e)=>e.status!=="Private")]);
        setloading(false);
       
      }
    } else {
      setloading(true);
    }
  }, [postslice.AllPosts,userfollowing,userfollowers]);

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
        <h1 className="text-white">No Active Post Add your's or try following people 😄</h1>
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
