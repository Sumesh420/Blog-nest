import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/auth';

export default function LogoutBtn() {
    const dispatch=useDispatch();
    const logOutHandler=()=>{
        authService.logOut()
        .then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">LogOut</button>
  )
}
