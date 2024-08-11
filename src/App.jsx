import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { setuserfollowers, setuserfollowing, setuserposts, setuserprofile, userLogin, userLogout } from "./features/authslice";
import  authservice  from "./appwrite/auth";
import Header from "./components/Header";
import Footer from './components/Footer.jsx'
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./components/Loading.jsx";
import Container from "./components/container/Container.jsx";
import UserServices from "./appwrite/UserServices.js";
import DatabasesServices from "./appwrite/configureappwrite.js";
import { setAllActivePosts, setAllPosts } from "./features/PostsSlice.js";
import { SetAllProfile } from "./features/profileslice.js";

function App() {

  const[loading,setloading]=useState(true);
  const [isLogedin, setisLogedin] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    authservice.GetCurrentUser().then((loginuser)=>{
      if(loginuser){
        setisLogedin(true);
        console.log(loginuser);
        console.log("D")
          dispatch(userLogin({userdata:loginuser}));
          UserServices.getProfile(loginuser.$id).then((profile)=>{
            if(profile){
              dispatch(setuserprofile(profile));
              console.log("profile at app",profile)
              DatabasesServices.getuserpost(loginuser.$id).then((data)=>{
                if(data){
                  dispatch(setuserposts({userposts:data.documents.reverse()}))
                  DatabasesServices.getPosts(true).then((data)=>{
                    if(data){
                      console.log(data.documents);

                      dispatch(setAllActivePosts({AllActivePosts:data.documents.reverse()}))
                      DatabasesServices.getPosts(false).then((data)=>{
                        if(data){
                          
                          dispatch(setAllPosts({AllPosts:data.documents.reverse()}))
                          UserServices.getAllProfile().then((data)=>{
                            console.log("all profile",data.documents.reverse());
                            dispatch(SetAllProfile({AllProfile:data.documents.reverse()}))
                            UserServices.listAllFollowing(loginuser.$id).then((followinglist)=>{
                              if(followinglist){
                                dispatch(setuserfollowing({userfollowing:followinglist.documents}))
                                console.log("follwoinglist",followinglist.documents);
                                UserServices.listAllFollowers(loginuser.$id).then((data)=>{
                                  if(data){
                                    dispatch(setuserfollowers({userfollowers:data.documents}))
                                    console.log(data.documents)
                                    setloading(false)
                                  }
                                })
                                
                              }
                            })
                           
                          }).catch(e=>console.log(e))
                        }
                      }).catch(e=>console.log(e));
                      
                    }
                  }).catch(e=>console.log(e));
                }
              })
            }
          }).catch((e)=>console.log(e))
         
          
          
          
      }else{
        
        dispatch(userLogout());
        setisLogedin(false);
        navigate("/root");
        
      }
    }).finally(()=>{
      
      setloading(false)})
  },[navigate])
 
  return !loading ? (
    <div className='w-full h-screen flex flex-col items-center content-center  bg-gray-700'>
      

        <Header />
        <main className="w-full h-full overflow-y-hidden   bg-slate-900 ">
          <Outlet />
        </main>
        {isLogedin&&<Footer />}
    </div>
  ) : (
    <Container>
<Loading/>
    </Container>
    
  
  )
}

export default App
