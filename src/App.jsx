import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { setuserposts, setuserprofile, userLogin, userLogout } from "./features/authslice";
import  authservice  from "./appwrite/auth";
import Header from "./components/Header";
import Footer from './components/Footer.jsx'
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./components/Loading.jsx";
import Container from "./components/container/Container.jsx";
import UserServices from "./appwrite/UserServices.js";
import DatabasesServices from "./appwrite/configureappwrite.js";
import { setAllActivePosts, setAllPosts } from "./features/PostsSlice.js";

function App() {

  const[loading,setloading]=useState(true);
  const [isLogedin, setisLogedin] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    authservice.GetCurrentUser().then((data)=>{
      if(data){
        setisLogedin(true);
        console.log(data);
        console.log("D")
          dispatch(userLogin({userdata:data}));
          UserServices.getProfile(data.$id).then((profile)=>{
            if(profile){
              dispatch(setuserprofile(profile));
              DatabasesServices.getuserpost(data.$id).then((data)=>{
                if(data){
                  dispatch(setuserposts({userposts:data.documents.reverse()}))
                  DatabasesServices.getPosts(true).then((data)=>{
                    if(data){
                      console.log(data.documents);

                      dispatch(setAllActivePosts({AllActivePosts:data.documents.reverse()}))
                      DatabasesServices.getPosts(false).then((data)=>{
                        if(data){
                          
                          dispatch(setAllPosts({AllPosts:data.documents.reverse()}))
                          
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
    <div className='w-screen h-screen flex flex-col content-between bg-gray-400'>
      

        <Header />
        <main className="w-full h-main   bg-slate-900 ">
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
