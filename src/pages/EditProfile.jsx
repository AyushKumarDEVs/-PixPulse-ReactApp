import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Container from "../components/container/Container";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserServices from "../appwrite/UserServices";
import { useDispatch, useSelector } from "react-redux";
import authservice from "../appwrite/auth";
import { data } from "autoprefixer";
import { setprofile } from "../features/profileslice";

function EditProfile() {
  const [loading, setloading] = useState(true);
  const { register, handleSubmit } = useForm();
  const {profileid}=useParams();
  const userprofile=useSelector(state=>state.auth).userprofile;
  const [profiledata, setprofiledata] = useState({});
  const [Image, setImage] = useState(null);
  const Navigate=useNavigate();
  const dispatch=useDispatch();

  function submit(formdata){
        if(formdata){
          setloading(true);
          if(formdata.profilephoto[0]){
            if(profiledata.profilephoto==="default"){
              UserServices.CreateProfilePhoto(formdata.profilephoto[0]).then((data)=>{
                if(data){
                  formdata.profilephoto=data.$id;
                  UserServices.UpdateProfile({username:formdata.username,email:formdata.email,profilephoto:data.$id,userid:profiledata.$id}).then((data)=>{
                    if(data){
                      setloading(false);
                      console.log("data",data)
                      dispatch(setprofile({profile:data}))
                      Navigate(`/profile/${data}`);
                    }
                  })
                }
              })
            }else{
              console.log(profiledata.profilephoto)
              UserServices.DeleteProfilePhoto(profiledata.profilephoto).then((data)=>{
                  if(data){
                    UserServices.CreateProfilePhoto(formdata.profilephoto[0]).then((data)=>{
                      if(data){
                        formdata.profilephoto=data.$id;
                        UserServices.UpdateProfile({profilephoto:data.$id,userid:profiledata.$id,username:formdata.username,email:formdata.email}).then((data)=>{
                          if(data){
                            setloading(false);
                            console.log("data",data)

                            dispatch(setprofile({profile:data}))

                            Navigate(`/profile/${data}`);
                          }
                        })
                      }
                    })
                  }
              })
            }
           
          }else{
            UserServices.UpdateProfile({username:formdata.username,email:formdata.email,profilephoto:profiledata.profilephoto,userid:profiledata.$id}).then((data)=>{
              if(data){
                setloading(false);
                console.log("data",data)

                dispatch(setprofile({profile:data}))
                Navigate(`/profile/${data}`);
              }
            })
          }
        }
        
    
  }  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  useEffect(()=>{
    setloading(true);

    if(userprofile){
      setprofiledata(userprofile)
      setloading(false);

    }else if(profileid){
      UserServices.getProfile(profileid).then((data)=>{
        if(data){
          setprofiledata(data);
          setloading(false);

        }
      })
    }else{
      setloading(true);
    }

      
  },[userprofile])

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  } else
    return (
      <Container>
         <form onSubmit={handleSubmit(submit)} className="flex flex-col w-full text-white  h-fit gap-3 items-center ">
        <div className="flex flex-col items-center  w-fit ">

            {!Image? <img className="w-40 h-40" src={UserServices.PreviewProfilePhoto(profiledata.profilephoto)}></img>:
                 <img className="w-32 h-32" src={Image} alt="preview" />
            }
          <input className="w-full text-white " onChangeCapture={(e)=>handleImageChange(e)} type="file" {...register("profilephoto",{required:false})} />
        </div>
        
        <div className="flex flex-col items-start gap-3">
        <div className=" flex  w-full p-1 h-fit flex-wrap ">
            <h3>
              Name :
            </h3>
            <input defaultValue={profiledata.username} className="text-center text-black bg-gray-200 rounded-md  font-medium h-fit p-1" type="text" {...register("username",{required:true})}></input>
       
          </div>
          <div className=" flex  w-full p-1 h-fit flex-wrap">
            <h3>
              Email :
            </h3>
            <input
              type="email"
              className="text-center text-black bg-gray-200 rounded-md  font-medium h-fit p-1" 
              defaultValue={profiledata.email}
              placeholder="email"
              {...register("email", { required: true })}
            ></input>
          </div>

          <h3>
            Userid : <span>{profiledata.$id}</span>
          </h3>
        </div>
        <button type="submit" className="bg-blue-600 p-2 rounded-lg">Update</button>

      </form>

      </Container>
     
    );
}

export default EditProfile;
