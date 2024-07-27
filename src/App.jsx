import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { userLogin, userLogout } from "./features/authslice";
import  authservice  from "./appwrite/auth";
import Header from "./components/Header";
import Footer from './components/Footer.jsx'
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./components/Loading.jsx";
import Container from "./components/container/Container.jsx";
function App() {

  const[loading,setloading]=useState(true);
  const dispatch=useDispatch();
  const userdata=useSelector(state=>state.userdata)
  const navigate=useNavigate();
  useEffect(()=>{
    authservice.GetCurrentUser().then((data)=>{
      if(data){
        console.log(data);
          dispatch(userLogin({userdata:data}));
          navigate("/home");
      }else{
        dispatch(userLogout());
        navigate("/home");
      }
    }).finally(()=>setloading(false))
  },[navigate])
 
  return !loading ? (
    <div className='w-screen h-screen flex flex-col content-between bg-gray-400'>
      

        <Header />
        <main className="w-full h-main   bg-slate-900 ">
          <Outlet />
        </main>
        <Footer />
    </div>
  ) : (
    <Container>
<Loading/>
    </Container>
    
  
  )
}

export default App
