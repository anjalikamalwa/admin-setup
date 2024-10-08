import React from 'react'
import AuthLogin from '../auth/auth-login'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
  if(localStorage.getItem("token") === null){
    return (
        <>
        <AuthLogin/>
        <Navigate to = {"/"} replace/>
        </>
      )
  }
  return children;
}

export default ProtectedRoute
