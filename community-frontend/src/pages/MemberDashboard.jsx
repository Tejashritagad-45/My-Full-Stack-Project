import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { leaveCommunity, setExistingDetails } from '../../store/slices/communitySlice'
import { setExistingEventDetails } from '../../store/slices/eventSlice'
import { styles } from '../css/memberDashboard.js'
import { Link } from 'react-router-dom'


const MemberDashboard = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_URL}/user`
  // const [data, setData] = useState(null)
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user)
  const communities = useSelector(state => state.community)

  const joinedCommunities = communities.joinedCommunities

  const rsvpEvents = useSelector(state => state.event)
  const rsvpedEvents = rsvpEvents.rsvpedEvents

  useEffect(() => {

    async function memberDashboardHandler() {


      try {
        const response = await axios.get(SERVER_URL + "/dashboard", { withCredentials: true })
        console.log(response);
        // setData(response?.data?.data?.dashboard)

        console.log("dashboard", response?.data?.data?.dashboard);
        const dashboard = response?.data?.data?.dashboard
        dispatch(setExistingDetails({
          joinedCommunities: dashboard?.joinedCommunities || []
        }))

        dispatch(setExistingEventDetails({
          rsvpedEvents: dashboard?.rsvpedEvents || []
        }))

        console.log("joined:", dashboard?.joinedCommunities);
        console.log("events:", dashboard?.rsvpedEvents);

      } catch (error) {
        console.log(error);

      }

    }
    memberDashboardHandler();
  }, [dispatch])
  // if (!user) return <h2>Loading...</h2>;

  // if (user.role !== "member") {
  //   return <h1>Only Members Can Access This Dashboard ❌</h1>;
  // }
  async function leaveCommunityHandler(id) {
      try {
        const response = await axios.patch(`${SERVER_URL}/leave-community/${id}`,
          {}, { withCredentials: true })
        console.log(response);
        dispatch(leaveCommunity({ communityId:id }))
  
  
      } catch (error) {
        console.log(error);
  
      }
    }






  return (
    <div className={styles.memberDashboard}>
      <h2 className={styles.heading}>"Great to see you, {user?.name}!"</h2>
      <h3 className={styles.role}>{user?.role}</h3>
      <h1 className={styles.title} >My joinedCommunities </h1>

        {
          joinedCommunities?.length === 0 ? (
            <p className={styles.para} >no  join communnity</p>
          ) : (
          <div className={styles.cardGrid}>
            {joinedCommunities?.map((community) => {
              return (
              <div className={styles.community} key={community._id}>
                <Link to={`/community/${community._id}`}>
                  <h2 className={styles.name} >{community.name}</h2>
                <h3 className={styles.category} >{community.category}</h3>
                </Link>
                <div className={styles.btndiv}>
                <button onClick={()=>{
                  leaveCommunityHandler(community._id)
                }}
                className={styles.leavebtn}
                
                >leave</button>
                </div>

              </div>
            );
          })}
      </div>
          )
        }

      <h1 className={styles.title} >My Rsvp Events</h1>
        {
          rsvpedEvents?.length === 0 ? (
            <p className={styles.para} >no rsvp join</p>
          ) : (
            <div className={styles.cardGrid}>
            { rsvpedEvents?.map((rsvp) => {
              return (<div className={styles.events} key={rsvp._id}>
                <Link to={`/event/${rsvp._id}`}>
                  <h1 className={styles.name} >{rsvp.name}</h1>
                </Link>
                <h3 className={styles.city} >{rsvp.city}</h3>
                <h4 className={styles.time} > 📅 {new Date(rsvp.time).toLocaleDateString("en-IN")} • ⏰{" "}
                  {new Date(rsvp.time).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</h4>
                <h3 className={styles.comName}>{rsvp.communityId?.name}</h3>

              </div>
              );
            })}
         </div>
           )
        }

    </div>
  )
}

export default MemberDashboard