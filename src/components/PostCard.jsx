import React from 'react'
import bucketService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

export default function PostCard({$id,featuredImage,title}) {
  console.log("ImageId:",featuredImage);
  const previewURL = bucketService.getFilePreview(featuredImage);
console.log("Preview URL:", previewURL);

  return (
        <Link to={`/post/${$id}`}>
                <div className='w-full bg-gray-100 rounded-xl p-4'>
                    <div className='w-full justify-center mb-4'>
                        <img src={previewURL} alt={title} className="min-w-56 rounded-xl"/>
                    </div>
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
        </Link>
  )
}
