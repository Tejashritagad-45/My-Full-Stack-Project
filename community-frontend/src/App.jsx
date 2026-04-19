import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import CommunitiesPage from './pages/CommunitiesPage'
import CommunityDetailsPage from './pages/CommunityDetailsPage'
import EventsPage from './pages/EventsPage'
import { useSelector, useDispatch } from "react-redux"
import { login } from '../store/slices/authSlice'
import CreateCommunityPage from './pages/CreateCommunityPage'
import EventDetailPage from './pages/EventDetailPage'
import MemberDashboard from './pages/MemberDashboard'
import CreateEventPage from './pages/CreateEventPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './components/HomePage'
import { useEffect } from 'react'
import axios from 'axios'
// import { useDispatch } from 'react-redux'
import { setExistingDetails } from '../store/slices/communitySlice'
import { setExistingEventDetails } from '../store/slices/eventSlice'
import HostDashboard from './pages/HostDashboard'
import { Toaster } from "react-hot-toast"
import ProtectedRoute from './pages/ProtectedRoute'



const App = () => {
  // const dispatch = useDispatch()
  const dispatch = useDispatch();
  const[loading,setLoading]=useState(true)
  const { user, isLoggedIn } = useSelector((state) => state.auth)
  const { joinedCommunities } = useSelector((state) => state.community)



  useEffect(() => {
    const SERVER_URL =`${import.meta.env.VITE_API_URL}/user`


    async function profile() {
      try {
        const response = await axios.get(SERVER_URL + "/me", { withCredentials: true })
        console.log(response);

        const user = response?.data?.data?.user
        console.log("FULL USER:", response?.data?.data?.user);

         if(user){

           dispatch(login({ user }));
         

        dispatch(setExistingDetails({
          joinedCommunities: user?.joinedCommunities || [],
          hostedCommunities: response?.data?.data?.hostedCommunities || []
        }))

        console.log({ user, joinedCommunities: user?.joinedCommunities });
        // console.log({ user, hostedCommunities: user?.hostedCommunities});


        dispatch(setExistingEventDetails({
          rsvpedEvents: user?.rsvpedEvents || [],
          myCreatedEvents: user?.myCreatedEvents || []
        }))
      }
      } catch (error) {
        console.log(error);


      }finally{
        setLoading(false);
      }
    };

    profile()
  }, [])



  

  function loginUser(email, password) {

    const user = { name: "raj" };
    dispatch(login(user));
  }

if(loading){
  return <div>Loading...</div>
}


  return (
    <div >
      <Navbar />
      <Toaster />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/communities' element={<CommunitiesPage />} />
        <Route path='/community/:id' element={<CommunityDetailsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path='/communities/create' element={<CreateCommunityPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path='events/createEvents' element={<CreateEventPage />} />
        

        <Route path='/dashboard' element={
          <ProtectedRoute>
            <MemberDashboard />
          </ProtectedRoute>
        } />

        <Route path='/host-Dashboard' element={
          
            <ProtectedRoute>
              <HostDashboard />
            </ProtectedRoute>
          } />
       
        

        <Route path='profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

      </Routes>



    </div>
  )
}

export default App