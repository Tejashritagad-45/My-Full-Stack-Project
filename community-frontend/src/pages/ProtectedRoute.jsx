import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    
    const user=useSelector(state=>state.auth.user)

   if(!user){
    return null;
   }

   return children
}

export default ProtectedRoute