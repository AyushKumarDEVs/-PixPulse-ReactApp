import React, { useEffect, useState } from "react";
import Container from "../components/container/Container";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import UserServices from "../appwrite/UserServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatabasesServices from "../appwrite/configureappwrite";
import PostCard from "../components/PostCard";
import Button from "../components/Button";

function Profile() {
  const [loading, setloading] = useState(true);
  const [userPosts, setuserPosts] = useState([]);
  const [profiledata, setprofiledata] = useState({});
  const LogedinUserProfile=useSelector(state=>state.auth).userprofile;
  const LogedinUserPosts=useSelector(state=>state.auth).usserposts;

  const { id } = useParams();
  const [isfollowing, setisfollowing] = useState(false);
  const [followers, setfollowers] = useState(0);
  const isauthor = id ? id === LogedinUserProfile.$id : true;
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
    UserServices.CheckforFollowing(profiledata.$id, LogedinUserProfile.$id).then(
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
    );
  }

  function updatefollowers(followerscount) {
        UserServices.UpdateProfile({
          ...profiledata,
          userid: profiledata.$id,
          followers: followers+followerscount,
        }).then((data1) => {setfollowers(data1.followers)});
      
  }


  
  useEffect(() => {
    setloading(true);
    if (id) {
      UserServices.getProfile(id)
        .then((data) => {
          if (data) {
            setprofiledata(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if(LogedinUserProfile){
    
            setprofiledata(LogedinUserProfile);
          
    }else{
      navigate("/profile");
    }
  }, [LogedinUserProfile,id]);

  useEffect(() => {
    checkFollowers();
    id?UserServices.listAllFollowers(profiledata.$id).then((data) => {
      if (data) {
        setfollowers(data.documents.length);
        UserServices.UpdateProfile({
          ...profiledata,
          userid: profiledata.$id,
          followers: data.documents.length,
        }).then((data1) => {});
      }
    })
    :
    setfollowers(profiledata.followers);

    id? DatabasesServices.getuserpost(profiledata.$id)
      .then((data) => {
        if (data) {
          setuserPosts(data.documents.reverse());
          console.log(data.documents);
          setloading(false);
        }
      })
    :
    setuserPosts(LogedinUserPosts);
    setloading(false);
    console.log(LogedinUserPosts) 
    
  }, [profiledata,LogedinUserPosts]);


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
              <div className="w-full   flex h-fit py-5 gap-5 overflow-x-scroll ">
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
