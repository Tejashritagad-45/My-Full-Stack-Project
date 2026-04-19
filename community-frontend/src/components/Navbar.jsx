import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styles } from '../css/navbar.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { logOut } from '../../store/slices/authSlice.js'
import { setExistingDetails } from '../../store/slices/communitySlice.js'
import { setExistingEventDetails } from '../../store/slices/eventSlice.js'
const Navbar = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_URL}/user`
  const user=useSelector(state=>state.auth.user)
  // const joinedCommunities=useSelector(state=>state.community.joinedCommunities)
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const dashboardpath= 
  user?.role=="host"?"/host-Dashboard":"/dashboard"

  async function logOutHandler() {
            try {
                const response = await axios.get(SERVER_URL + "/logout", { withCredentials: true })
                console.log(response);
                dispatch(logOut())
                dispatch(setExistingDetails({
                  joinedCommunities: [],
                  hostedCommunities: []
                }))

                dispatch(setExistingEventDetails({
                 rsvpedEvents:[],
                  myCreatedEvents:[]
                }))

                // const isJoined=user && joinedCommunities.some((com)=>{
                //  com._id===community._id
                // })

                navigate("/login")
                  
            } catch (error) {
                console.log(error);
                

            }

        }

       
  return (
    <div className={styles.nav}>
        <div className={styles.navcontainer}>
          <img  className={styles.img} src="/image1.png" alt="" />
          </div>
            
            {/* <div className={styles.navbar}> */}

            <div className={styles.Navlinks}>
                <Link to={"/communities"}>Communities</Link>
                <Link to={"/events"}>Events</Link>
               {user && <Link to={dashboardpath}>Dashboard</Link>}
                { user && <Link to={"/profile"}>Profile</Link>}
            </div>

               {
                user ? (
                  <button onClick={logOutHandler} className={styles.btn}>Logout</button>
                ):(
                   <Link className={styles.btn}  to={"/register"}><button>Sign Up</button></Link>
                )
               }
               
        
    </div>
  )
}

export default Navbar












