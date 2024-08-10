import React, { useEffect, useState } from "react";
import Container from "../components/container/Container";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import UserServices from "../appwrite/UserServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatabasesServices from "../appwrite/configureappwrite";
import PostCard from "../components/PostCard";
import Button from "../components/Button";
import { setprofile } from "../features/profileslice.js";

function Profile() {
  const [loading, setloading] = useState(true);
  const [userPosts, setuserPosts] = useState([]);
  const [profiledata, setprofiledata] = useState({});
  const Allprofiles=useSelector(state=>state.profileslice).AllProfile;
  const AllPosts=useSelector(state=>state.postslice).AllPosts;
  const LogedinUserProfile=useSelector(state=>state.auth).userprofile;
  const dispatch=useDispatch();
  let { id } = useParams();
  const [isfollowing, setisfollowing] = useState(false);
  const [followers, setfollowers] = useState(0);
  const [isauthor, setisauthor] = useState(false)
  
  const navigate=useNavigate();
  //make it true by default

  function onClickFollow() {
    setloading(true);
    UserServices.CheckforFollowing(profiledata.$id, LogedinUserProfile.$id).then(
      (data) => {
        if (data) {
          if (data.documents.length > 0) {
            UserServices.DeleteFollower(data.documents[0].$id)
              .then((data) => {
                if (data) {
                  updatefollowers(-1);
                  setisfollowing(false);
                  setloading(false);
                }
              })
              
          } else {
            
            UserServices.CreateFollower({
              followerid: LogedinUserProfile.$id,
              followingid: profiledata.$id,
            })
              .then((data) => {
                if (data) {
                  updatefollowers(1);
                  setisfollowing(true);
                  setloading(false)
                }
              })
              
          }
        }
      }
    );
  }

  function checkFollowers() {
    //checking for following

    profiledata&&LogedinUserProfile?UserServices.CheckforFollowing(profiledata.$id, LogedinUserProfile.$id).then(
      (data) => {
        if (data) {
          if (data.documents.length > 0) {
            console.log("check following list"+data.documents.length)
            setisfollowing(true);
          } else {
            setisfollowing(false);
          }
        }
      }
    ):setisfollowing(false);
  }

  function updatefollowers(followerscount) {
        UserServices.UpdateProfile({
          ...profiledata,
          userid: profiledata.$id,
          followers: profiledata.followers+followerscount,
        }).then((data) => {
          console.log(data)
          dispatch(setprofile({profile:data}))
          setfollowers(data.followers);
        });
      
  }


  
  useEffect(() => {
  

    if(Allprofiles.length>0&&Object.keys(LogedinUserProfile).length>0){
      id?setprofiledata(Allprofiles.filter((e)=>e.$id===id)[0]):setprofiledata(LogedinUserProfile)
    }
      


  }, [id,Allprofiles,LogedinUserProfile,Object.keys(profiledata).length > 0?Allprofiles.filter((each)=>each.$id===profiledata.$id):null]);

  useEffect(() => {
    console.log(LogedinUserProfile)
    if(Object.keys(profiledata).length > 0&&Object.keys(LogedinUserProfile).length>0){
      console.log(profiledata)
      setisauthor( id ? LogedinUserProfile?id === LogedinUserProfile.$id:false:true)
      
      checkFollowers();
    
      setfollowers(profiledata.followers);
      
     setuserPosts(AllPosts.filter((each)=>each.userid===profiledata.$id))
      setloading(false);
      console.log(AllPosts) 
    }else{
      setloading(true)
    }
    
    
  }, [profiledata,LogedinUserProfile,Allprofiles]);


  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  } else
    return profiledata ? (
      <Container>
        <div className="w-full h-full flex flex-col items-center text-white  gap-8 overflow-y-scroll">
          <div className="flex gap-4 w-full h-fit justify-center">
            {profiledata.profilephoto ? (
              <img
                className="w-40 h-40 rounded-lg"
                src={
                  profiledata.profilephoto
                    ? UserServices.PreviewProfilePhoto(profiledata.profilephoto)
                    : "/"
                }
                alt={profiledata.profilephoto}
              />
            ) : (
              <Loading />
            )}

            {isauthor ? (
              <Link to={`/editprofile/${id ? id : LogedinUserProfile.$id}`}>
                🖋
              </Link>
            ) : null}
          </div>
          <h1 className="text-center h-fit te w-full text-4xl">
            {profiledata.username}
            <h2> Followers : {followers}</h2>
          </h1>
          {
            !isauthor ? (
              <button onClick={onClickFollow}>
                {isfollowing ? "unfollow" : "follow"}
              </button>
            ) : null 
          }

          <div className="flex gap-5 w-full justify-center">
            <Link to={`/followers/${profiledata.$id}/${profiledata.username}`}>
              <button className="bg-blue-600 p-2 rounded-lg">Followers</button>
            </Link>
            <Link to={`/following/${profiledata.$id}/${profiledata.username}`}>
              <button className="bg-blue-600 p-2 rounded-lg">Following</button>
            </Link>
          </div>
          <div className=" text-lg flex flex-col gap-3 justify-center ">
            <h3>
              Email : <span>{profiledata.email}</span>
            </h3>
            <h3>
              userid : <span>{profiledata.$id}</span>
            </h3>
          </div>
          <div className="w-full  h-fit flex flex-col gap-4 items-center">
            <h2 className="text-3xl font-bold">Posts</h2>
            {userPosts ? (
              <div className="w-full   flex h-fit py-5 gap-5 overflow-x-scroll sm:mb-10">
                {userPosts.map((each) => (
                  <PostCard
                    key={each.articleimage}
                    $id={each.$id}
                    title={each.title}
                    userid={profiledata.$id}
                    articleimage={each.articleimage}
                  />
                ))}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </Container>
    ) : (
      <h1>login To view profile</h1>
    );
}

export default Profile;
