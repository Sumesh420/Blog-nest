import React, {useState,useEffect} from 'react'
import {Container,PostForm} from "../components/index.js"
import bucketService from "../appwrite/config.js"
import { useNavigate,useParams } from 'react-router-dom'
export default function EditPost() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            bucketService.getPost(slug).then((post)=>{
              if(post){
                setPost(post)
              }
            })
        }
        else{
            navigate("/")
        }
    },[slug,navigate])
  return post?(
    <div className="py-8">
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}
