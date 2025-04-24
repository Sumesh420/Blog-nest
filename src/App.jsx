import { useEffect, useState } from 'react'
import  authService from "./appwrite/auth.js"
import { login,logout } from './store/auth.js';
import { useDispatch } from 'react-redux';
import { Footer, Header } from './components/index.js';
import { Outlet } from 'react-router-dom';

function App() {
 const [loading,setLoading]=useState(true);
 const dispatch=useDispatch()
     useEffect(()=>{
      authService.currentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=>{
        setLoading(false)
      })
     },[])

  return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block text-center">
        <Header/>
        <main>
         
        </main>
        <Footer/>
      </div>
  </div>):null
}

export default App
