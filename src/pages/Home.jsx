import React,{useEffect,useState} from 'react'
import bucketService from "../appwrite/config.js"
import {Container,PostCard} from "../components/index.js"
export default function Home() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        bucketService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    if(!posts.length){
        return (
            <div className="w-full py-8 mt-4 text-center">
              <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 width-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
              </Container>
            </div>
          )
    }
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
  
}
