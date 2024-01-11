"use client"
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/profile"


const Myprofile = () => {
const {data : session} = useSession()
const router = useRouter()
const [posts,setPosts]= useState([])
useEffect(()=>{
    const fetchPost = async()=>{
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      console.log('response------>',response);
      const data = await response.json();
      console.log('data------>',data);
      setPosts(data)
    }
   if(session?.user.id) fetchPost();
  },[])
  
    const handleEdit = (profile)=>{
router.push(`/update-prompt?id=${profile._id}`)
    }
    const handleDelete = async(profile)=>{
const hasConfirmed = confirm("Are You sure you want to delete this post?")
if (hasConfirmed){
    try {
        await fetch(`api/prompt/${profile._id.toString()}`,{
method:'DELETE'
        });
        const filteredPost = posts.filter((p)=> p._id !== profile._id);
        setPosts(filteredPost)
    } catch (error) {
        console.log(error);
    }
}
    }
    useEffect(()=>{
        console.log('posts',posts);
          },[handleDelete])
  return (
    <div>
    <Profile
    name={"my"}
    desc={"welcome To Your personalized profile page"}
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
    </div>
  )
}

export default Myprofile
