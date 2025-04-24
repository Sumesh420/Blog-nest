import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/auth";
import { useDispatch } from "react-redux";
import { Button, Logo, Input } from "./index.js";
import { useForm } from "react-hook-form";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const { register, handleSubmit } = useForm();
  async function create(data) {
    setErrors("");
    const userData = await authService.createAccount(data);
    if (userData) {
      const userData = await authService.currentUser();
      if (userData) {
        dispatch(login({ userData }));
        navigate("/");
      }
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              type="text"
              label="Full Name: "
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              type="email"
              label="Email :"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              type="password"
              label="Password :"
              placeholder="Enter your email"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value) ||
                    "Enter a strong password with lowercase and numbers should be 8 characters long",
                },
              })}
            />
            <Button type="submit" className="w-full">Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
