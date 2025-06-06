import React, {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {Button,Select,Input,RTE} from "../index.js"
import { useNavigate } from 'react-router-dom'
import bucketService from "../../appwrite/config.js"
export default function PostForm({post}) {
  const {register,handleSubmit,watch,setValue,getValues,control}=useForm({
    defaultValues:{
      title:post?.title || "",
      slug:post?.slug || "",
      content:post?.content || "",
      status:post?.status || "active",
      
    }
  })
  const navigate=useNavigate()
  const userData=useSelector(state=>state.auth.userData)
  const slugTransform=useCallback((value)=>{
    if(value && typeof value==="string") 
      return value.trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-') // Replace invalid chars with a hyphen
    .replace(/^-+/, '') // Remove leading hyphen
    .replace(/-+$/, ''); // Remove trailing hyphen
    
      
    
  },[])
  useEffect(()=>{
    const subscription=watch((value,{name})=>{
      if(name==="title"){
        setValue("slug",slugTransform(value.title,{shouldValidate:true}))
      }
     
    });
     return ()=> subscription.unsubscribe()
  },[watch,slugTransform,setValue])
  const submit = async (data) => {  //https://fra.cloud.appwrite.io/v1/storage/buckets/67fc7ea800104ca95253/files/680b8f150033c9a10700/view?project=67fc77580034ab3c8a83&mode=admin
    console.log(data)
    if (post) {
    
        const file = data.image[0] ? await bucketService.uploadFile(data.image[0]) : null;

        if (file) {
            bucketService.deleteFile(post.featuredImage);
        }

        const dbPost = await bucketService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    } else {
        const file = await bucketService.uploadFile(data.image[0]);
        console.log(file)
        if (file) {
          console.log("No file",file)
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await bucketService.createPost({ ...data, userId: userData.$id });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }
};
  return (
    
 <form onSubmit={handleSubmit(submit)} className="flex flex-wrap justify-between items-center">
      <div className="w-2/3 px-2">
      <Input 
      label="Title"
      placeholder="Title"
      className="mb-4"
      {...register("title",{required:"true"})}
      />
      <Input 
      label="Slug"
      placeholder="Slug"
      className="mb-4"
      {...register("slug",{required:true})}
      onInput={(e)=>{
        setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
      }}
      />
      <RTE label="Content" name="content" control={control} defaultValues={getValues("content")}/>
      </div>
      
      <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0 ml-auto">
      <Input label="Featured Image :"
      type="file"
      className="mb-4" 
      accept="image/png, image/jpg, image/jpeg, image/gif"
      {...register("image",{required:!post})}
      />
      {post && (
        <div className="w-full mb-4">
          <img src={bucketService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
        </div>
      )}
      <Select 
      options={["active","inactive"]}
      label="Status"
      className="mb-8"
      {...register("status",{required:true})}
      />
      <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-4" >{post ? "Update":"Submit"}</Button>
      </div>
    </form>

   
   
  )
}
