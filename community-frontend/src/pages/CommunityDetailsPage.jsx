import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { styles } from '../css/communityDetail.js'
import { useSelector, useDispatch } from 'react-redux'
import { joinCommunities, leaveCommunity, deleteCommunity } from '../../store/slices/communitySlice.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const CommunityDetailsPage = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_URL}/community`
  const SERVER_URLs = `${import.meta.env.VITE_API_URL}/user`
  // const SERVER_URLDELETE = "http://localhost:5000/api/community"
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [event, setEvent] = useState([]);
  const [member, setMember] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)





  useEffect(() => {
    async function getCommunityDetails() {
      try {
        const response = await axios.get(`${SERVER_URL}/specific?id=${id}`,{withCredentials:true})
        console.log(response);
        setCommunity(response?.data?.data?.specificCommunity?.community);
        setEvent(response?.data?.data?.specificCommunity?.events);

        const res = await axios.get(`${SERVER_URL}/with-members?id=${id}`)
        console.log(res?.data?.data?.community);
        setMember(res?.data?.data?.community?.members)



      } catch (err) {
        console.log(err);

      }
    }
    getCommunityDetails();
  }, [id])


  // this is for a join community

 

  const joinedCommunities = useSelector((state) => state.community.joinedCommunities)
  const isJoined = joinedCommunities?.find(
    (comunityy) => comunityy._id === community?._id
  );


  async function joinCommunity() {

    if (!user) {
      toast.error("Please login to join community")
      navigate("/login")
      return;
    }

    try {
      const response = await axios.patch(`${SERVER_URLs}/join-community?communityId=${community._id}`,
        {}, { withCredentials: true })
      console.log(response);
      dispatch(joinCommunities(community))

    } catch (error) {
      console.log(error);

    }

  }



  // this is for leaveCommunity
  async function leaveCommunityHandler() {
    try {
      const response = await axios.patch(`${SERVER_URLs}/leave-community/${community._id}`,
        {}, { withCredentials: true })
      console.log(response);
      dispatch(leaveCommunity({ communityId: community._id }))


    } catch (error) {
      console.log(error);

    }
  }

  // this is for a delete commuity


  const isHost = user?._id === community?.host?._id
  async function deleteCommunityHandler() {
    try {
      const response = await axios.delete(`${SERVER_URL}/${community._id}`, { withCredentials: true })
      console.log(response);
      dispatch(deleteCommunity({ communityId: community._id }))
      navigate("/communities")

    } catch (error) {
      console.log(error);

    }

  }

  //  console.log(user);



  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className='flex justify-center'>  

        <Link to={"/events/createEvents"} >
        <button className='bg-blue-400 py-1 px-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 '>Create Event</button>
        </Link>
        </div>
        {
          community && (
            <div className={styles.pageDetail}>
              <h4 className={styles.category}>{community.category}</h4>
              <h1 className={styles.name}> {community.name}</h1>
              <p className={styles.description}>{community.description}</p>
              <h3 className={styles.host}> host:{community.host?.name}</h3>



              {
                isJoined ? (
                  <button
                    className={styles.deletebtn}
                    onClick={leaveCommunityHandler}
                  >
                    Leave Community</button>

                ) : (
                  <button
                    className={styles.joinbtn}
                    onClick={joinCommunity}
                  // disabled={isJoined}
                  >
                    join Community</button>
                )
              }

              {
                isHost && (
                  <button
                    className={styles.deletebtn}
                    onClick={deleteCommunityHandler}
                  >
                    Delete Community 🗑️</button>
                )
              }

            </div>




          )
        }

  
         {isHost && (
  <>
    <h2 className={styles.heading}> 👤Members:{member?.length}</h2>

    <div className={styles.memberContainer}>
      {
        member?.length === 0 ? (
          <p>No members join this community</p>
        ) : (
          member?.map((member) => {
            return (
              <div key={member._id} className={styles.memberRow}>
                <h1 className={styles.memberName}>{member.name}</h1>
                <h2 className={styles.memberEmail}>📧{member.email}</h2>
              </div>
            )
          })
        )
      }
    </div>
  </>
)}




        <div className={styles.events} >
          <h2 className={styles.eventHeading}>📅 Community Events</h2>

          <div className={styles.eventGrid}>
            {
              event?.map((event) => {
                return <div className={styles.eventContiner} key={event._id}>
                  <h1 className={styles.eventName}>{event.name}</h1>
                  <h2 className={styles.city}>{event.city}</h2>
                  <h3 className={styles.venue}>{event.venue}</h3>
                  <h2 className={styles.time}>{new Date(event.time).toLocaleString()}</h2>

                </div>
              })

            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default CommunityDetailsPage