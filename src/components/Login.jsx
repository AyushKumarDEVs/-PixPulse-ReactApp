import React, { useState } from "react";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { userLogin, userLogout } from "../features/authslice";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import UserServices from "../appwrite/UserServices.js";
import Loading from "./Loading.jsx";
import Container from "./container/Container.jsx";

function Login() {
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { handleSubmit, register,formState: { errors } } = useForm();
  const Navigate = useNavigate();
  function login(data) {
    setloading(true);
    authservice
      .Login({ password: data.password, email: data.email })
      .then((logedata) => {
        if (logedata) {
          authservice.GetCurrentUser().then((logindata) => {
            if (logindata) {
              dispatch(userLogin({ userdata: logindata }));
              UserServices.getProfile(logindata.$id).then((profiledata) => {
                if (profiledata) {
                  Navigate(`/editprofile/${logindata.$id}`);
                } else {
                  UserServices.CreateProfile({
                    username: logindata.name,
                    email: logindata.email,
                    followers: 0,
                    userid: logindata.$id,
                  })
                    .then((data) => {
                      if (data) {
                        Navigate(`/editprofile/${logindata.$id}`);
                        console.log("login data while login :" + logindata);
                      }
                    })
                    .catch((e) => {    setloading(false);

                      console.log(e)});
                }
              }).catch((e)=>{
                setloading(false);

                console.log(e)});

             
            } else {
              dispatch(userLogout());
            }
          });
        }
      })
      .catch((error) => {
        setloading(false);

        seterror("" + error);
      });
  }
  if(loading){
    return (<Container>
        <Loading/>
    </Container>)
}
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div
        className={` flex flex-col gap-3 w-fit bg-gray-100 rounded-xl p-2 items-center`}
      >
        <div className="flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
          <Logo prop={'w-14  h-13 bg-slate-900'} />

          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600  text-center w-60 sm:w-full text-wrap">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="">
          <div className="space-y-5 w-full">
            <Input
              label="Email: "
             
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          {errors.email && <span className="text-red-800">This field is required</span>}

            <Input
              label="Password: "
              type="password"
              pattern="(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}" 
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <span class="error-message w-60">Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.</span>
            {errors.password && <h3 className="text-red-800">This field is required</h3>}

            <Button type="submit" className="w-full">
              {" "}
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
