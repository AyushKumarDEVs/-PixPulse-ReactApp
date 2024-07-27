import React, { useState } from "react";
import authservice from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { userLogin, userLogout } from "../features/authslice";
import { ID } from "appwrite";
import UserServices from "../appwrite/UserServices";
import Container from "./container/Container";
import Loading from "./Loading";

function Signup() {
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const {handleSubmit,register,formState: { errors }}=useForm();
  const Navigate=useNavigate();

  function signup(data) {
    setloading(true);

    authservice
      .CreateAccount({
        username: data.name,
        password: data.password,
        email: data.email,
      })
      .then((data) => {
        if (data) {
            console.log("account data:"+data);
            Navigate("/login");
              
        } 
         
      }).catch((error)=>{
        setloading(false);

        seterror(""+error)
      });
  }

  if(loading){
    return (<Container>
        <Loading/>
    </Container>)
}
  return <div className="flex items-center justify-center h-full">
  <div className={`w-full max-w-lg bg-gray-100 rounded-xl p-2 border h-fit border-black/10`}>
        <div className="flex items-center justify-center flex-row-reverse">
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

        <Logo prop={'w-14  h-13 bg-slate-900'} />

        </div>
      <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
          >
              Sign In
          </Link>
      </p>
      {error && <p className="text-red-600  text-center">{error}</p>}

      <form onSubmit={handleSubmit(signup)}>
          <div className='space-y-5'>
              <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                  required: true,
              })}
              />
                        {errors.name && <span className="text-red-800">This field is required</span>}

              <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                  required: true,
                  validate: {
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
              })}
              
              />
                        {errors.email && <span className="text-red-800">This field is required</span>}

              <Input
              label="Password: "
              type="password"
              pattern="(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}" 
              placeholder="Enter your password"
              {...register("password", {
                  required: true,})}
              />
                          <span class="error-message w-60">Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.</span>

                        {errors.password && <h3 className="text-red-800">This field is required</h3>}

              <Button type="submit" className="w-full">
                  Create Account
              </Button>
          </div>
      </form>
  </div>

</div>
}

export default Signup;
