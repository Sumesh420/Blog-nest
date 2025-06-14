import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import { login as authLogin } from '../store/auth.js'
import {Button,Input,Logo} from "./index.js"
import {useDispatch} from "react-redux"
import authService from '../appwrite/auth.js'
import { useForm } from 'react-hook-form'
export default function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [errors,setError]=useState("")
    const login=async(data)=>{
        setError("")
        try {
            const session=await authService.login(data)
            if(session){
              const userData=await authService.currentUser()
              if(userData){
                dispatch(authLogin(userData))
                navigate("/")
              } 
            }
        } catch (error) {
            setError(error.message)
        }
    }
    
  return (
    <div className="flex items-center justify-center w-full">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%"></Logo>
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign In to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">Don&apos;t have any account?
              <Link to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline">
                Sign Up
              </Link>
            </p>
            {errors && <p className="text-red-600 mt-8 text-center">{errors}</p> }
            <form onSubmit={handleSubmit(login)}
            className="mt-8">
              <div className="space-y-5">
                <Input 
                  type="email"
                  label="Email :"
                  placeholder="Enter your email"
                  {...register("email",{
                    required:true,
                    validate:{
                      matchPattern:(value)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 
                      "Email address must be a valid address"
                    }
                  })}
                      
                />
                <Input 
                type="password"
                label="Password :"
                placeholder="Enter your email"
                {...register("password",{
                  required:true,
                  validate:{
                    matchPattern:(value)=>/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value) ||
                    "Enter a strong password with lowercase and numbers should be 8 characters long"
                  }
                })}/>
                <Button type="submit" className="w-full">Sign In</Button>
              </div>
            </form>
        </div>
    </div>
  )
}
