import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setExistingDetails } from '../../store/slices/communitySlice';
import axios from 'axios';
import { setExistingEventDetails } from '../../store/slices/eventSlice';
import { Link } from 'react-router-dom';
import { styles } from '../css/hostDashboard.js';
import { leaveCommunity } from '../../store/slices/communitySlice';
import { deleteCommunity } from '../../store/slices/communitySlice';

const HostDashboard = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_URL}/user`
  const SERVER_URLDELETE = `${import.meta.env.VITE_API_URL}/community`

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user)

  const communities = useSelector(state => state.community)
  const joinedCommunities = communities.joinedCommunities
  const hostedCommunities = communities.hostedCommunities

  const event = useSelector(state => state.event)
  const rsvpedEvents = event.rsvpedEvents
  const myCreatedEvents = event.myCreatedEvents

  useEffect(() => {
      if(!user) return
    async function hostDashboardHandler() {
      try {
        const response = await axios.get(SERVER_URL + "/host-dashboard",

          { withCredentials: true }
        );
        console.log(response?.data?.data?.hostDashboard);
        const hostDashboard = response?.data?.data?.hostDashboard || {}

        dispatch(setExistingDetails({
          joinedCommunities: hostDashboard.joinedCommunities || [],
          hostedCommunities: hostDashboard.hostedCommunities || []

        }));
        dispatch(setExistingEventDetails({
          rsvpedEvents: hostDashboard.rsvpedEvents || [],
          myCreatedEvents: hostDashboard.createdEvents || []
        }))




      } catch (error) {
        console.log(error);

      }

    }



    hostDashboardHandler();
  }, [dispatch,user])


  async function leaveCommunityHandler(id) {
    try {
      const response = await axios.patch(`${SERVER_URL}/leave-community/${id}`,
        {}, { withCredentials: true })
      console.log(response);
      dispatch(leaveCommunity({ communityId: id }))


    } catch (error) {
      console.log(error);

    }
  }


  //  const isHost = user?._id === community?.host?._id
  async function deleteCommunityHandler(id) {
    try {
      const response = await axios.delete(`${SERVER_URLDELETE}/${id}`, { withCredentials: true })
      console.log(response);
      dispatch(deleteCommunity({ communityId: id }))
      // navigate("/communities")

    } catch (error) {
      console.log(error);

    }

  }



  // dispatch(setExistingDetails({
  //   joinedCommunities: joinedCommunities
  // }))



  return (
    <div className={styles.hostDashboard}>
      <h1 className={styles.heading} > Hey {user?.name}! You’re hosting and joining amazing communities🚀</h1>
      {/* <Link to={"/communities/create"}>
      <button  className={styles.btn} >create community</button>
      </Link> */}
      <h2 className={styles.role}>{user?.role}</h2>

      <h3 className={styles.title} >My Hosted Communities</h3>
      <Link to={"/communities/create"}>
        <button className={styles.btn} >Create Community</button>
      </Link>




      {
        hostedCommunities?.length === 0 ? (
          <p className={styles.para} >No Hosted Communities</p>
        ) : (

          <div className={styles.cardGrid} >

            {hostedCommunities?.map((hostedcom) => {
              return (<div className={styles.hostedcom} key={hostedcom._id}>
                <Link to={`/community/${hostedcom._id}`}>
                  <h1 className={styles.name} >{hostedcom.name}</h1>

                  <h3 className={styles.category} >{hostedcom.category}</h3>
                  <h4 className={styles.des} >{hostedcom.description}</h4>

                </Link>


                <div className={styles.btndiv}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCommunityHandler(hostedcom._id)
                    }}
                    className={styles.deletebtn}
                  >

                    Delete</button>
                </div>


              </div>

              );
            })}
          </div>
        )
      }



      <h3 className={styles.title} >My Joined Communities</h3>
      {
        joinedCommunities?.length === 0 ? (
          <p className={styles.para} >No Join Communities</p>
        ) : (
          <div className={styles.cardGrid} >

            {joinedCommunities?.map((community) => {
              return (<div className={styles.community} key={community._id}>
                <Link to={`/community/${community._id}`}>
                  <h2 className={styles.name} >{community.name}</h2>


                  <h2 className={styles.category} >{community.category}</h2>
                </Link>
                <div className={styles.btndiv}>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    leaveCommunityHandler(community._id)

                  }}
                    className={styles.leavebtn}
                  >
                    Leave
                  </button>
                </div>
              </div>

              )
            })}
          </div>
        )
      }



      <h2 className={styles.title}>My Created Events</h2>
      <Link to={"/events/createEvents"}>
        <button className={styles.btn}>Create Event</button>
      </Link>

      {
        myCreatedEvents?.length === 0 ? (
          <p className={styles.para}>No Created Event </p>
        ) : (
          <div className={styles.cardGrid}>
            {myCreatedEvents?.map((createdEvent) => {
              return (<div className={styles.events} key={createdEvent._id}>
                <Link to={`/event/${createdEvent._id}`}>
                  <h2 className={styles.name} >{createdEvent.name}</h2>

                  <h3 className={styles.city} >{createdEvent.city}</h3>
                  <h4 className={styles.time}>
                    📅 {
                      createdEvent?.time
                        ? new Date(createdEvent.time).toLocaleDateString("en-IN")
                        : "No date"
                    }
                    • ⏰ {
                      createdEvent?.time
                        ? new Date(createdEvent.time).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                        : ""
                    }
                  </h4>
                  <h3 className={styles.comName} >{createdEvent.communityId?.name}</h3>
                </Link>
              </div>
              )

            })}
          </div>
        )
      }


      <h3 className={styles.title} >My Rsvp Events</h3>


      {
        rsvpedEvents?.length === 0 ? (
          <p className={styles.para} >No RSVP Events</p>
        ) : (
          <div className={styles.cardGrid}>
            {rsvpedEvents?.map((rsvp) => {
              return (
                <div className={styles.events} key={rsvp._id}>
                  <Link to={`/event/${rsvp._id}`}>
                    <h2 className={styles.name} >{rsvp.name}</h2>

                    <h3 className={styles.city} >{rsvp.city}</h3>
                    <h4 className={styles.time}>
                      📅 {
                        rsvp?.time
                          ? new Date(rsvp.time).toLocaleDateString("en-IN")
                          : "No date"
                      }
                    </h4>
                    <h3 className={styles.comName} >{rsvp.communityId?.name}</h3>
                  </Link>
                </div>
              )
            })}
          </div>
        )
      }




    </div>
  )
}

export default HostDashboard