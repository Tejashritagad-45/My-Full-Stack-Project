import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styles } from '../css/eventDetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRsvpEvent, deleteEvent, rsvpEvent } from '../../store/slices/eventSlice';
import toast from 'react-hot-toast';

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const[member,setMember]=useState([]);
  const { id } = useParams();
  const SERVER_URL = `${import.meta.env.VITE_API_URL}/event`
  const SERVER_URLs = `${import.meta.env.VITE_API_URL}/user`
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user)


  useEffect(() => {
    async function eventDetail() {
      try {
        const response = await axios.get(`${SERVER_URL}/getSpecific?id=${id}`,{withCredentials:true});
        console.log(response.data)

        setEvent(response?.data?.data?.event)

      } catch (error) {
        console.log(error)
      }
    }
    eventDetail()
  }, [id])

  const rsvpedEvent = useSelector(state => state.event.rsvpedEvents)

  const isJoined = rsvpedEvent?.some(event => String(event._id) === String(id))


  async function toggleRsvp() {

    if (!user) {
      toast("please login first")
      navigate("/login")
      return
    }

    try {
      const res = await axios.patch(`${SERVER_URLs}/toggleRsvp?eventId=${id}`, {}, { withCredentials: true })
      console.log(res.data);

      // const eventdata=res.data.data
      // console.log(eventdata);

       if (isJoined) {
      dispatch(cancelRsvpEvent({ eventId: id }));

     
      if (isHost) {
        setMember(prev => prev.filter(m => m._id !== user._id));
      }

    } else {
      dispatch(rsvpEvent(event));

      
      if (isHost) {
        setMember(prev => [...prev, user]);
      }
    }

    

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(()=>{
    if(!id || !event)return
    const isuserHost =String (user?._id )=== String(event?.communityId?.host?._id);
   if(!isuserHost)return;
  async function eventMember() {
    try{
      const memberres=await axios.get(`${SERVER_URL}/withEventMember?id=${id}`)
      console.log(memberres);
      console.log(memberres?.data?.data?.event);
      setMember(memberres?.data?.data?.event?.members)
      
      
    }catch(error){
      console.log(error);

      
    }
    
  }
eventMember()
},[id,event,user])


  const isHost =String (user?._id )=== String(event?.communityId?.host?._id);
  async function deleteEventHandler() {
    try {
      const eventRes = await axios.delete(`${SERVER_URL}/${event._id}`, { withCredentials: true })
      console.log(eventRes);
      dispatch(deleteEvent({ eventId: event._id }))
      navigate("/events")

    } catch (error) {
      console.log(error);

    }

  }







  return (
     <div className={styles.mainDiv}>  
    <div className={styles.wrapper}>
    
      {event ? (
        <div className={styles.container}>

          <h1 className={styles.title}>
            {event.name}
          </h1>

          <p className={styles.description}>
            {event.description}
          </p>

          <div className={styles.grid}>

            <div className={styles.box}>
              <p className={styles.label}>City</p>
              <p className={styles.value}>{event.city}</p>
            </div>

            <div className={styles.box}>
              <p className={styles.label}>Venue</p>
              <p className={styles.value}>{event.venue}</p>
            </div>

            <div className={styles.box}>
              <p className={styles.label}>Time</p>
              <p className={styles.value}>
                {new Date(event.time).toLocaleString()}
              </p>
            </div>

            <div className={styles.box}>
              <p className={styles.label}>Capacity</p>
              <p className={styles.value}>{event.capacity}</p>
            </div>

          </div>

          <div className={styles.communityBox}>
            <h2 className={styles.communityTitle}>
              Community
            </h2>
            <p className='font-serif'>
              {event.communityId?.name}
            </p>

            <p className={styles.host}>
              Host: {event.communityId?.host?.name}
            </p>
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.button}
              onClick={toggleRsvp}
            // disabled={!user}
            >
              {isJoined ? "Cancel Rsvp" : "join Rsvp"}
            </button>


            {isHost && (
              <button
                className={styles.deletebutton}
                onClick={deleteEventHandler}
              >
                Delete Event
              </button>
            )}
          </div>



        </div>
        
      ) : (
        <p>Loading the event ...</p>
      )}
    


     {
      isHost && (
         <div className={styles.memberContainer}>
        <h2 className='font-serif'>👤Members</h2>
        {
          member?.length==0 ?(
            <p className={styles.para}>member is not found</p>
          ):(
            member?.map((member)=>{
             return <div className={styles.memberCard}key={member._id}>
               <h1 className={styles.name}>{member.name}</h1>
              <h2 className={styles.email}>{member.email}</h2>
             </div>
            })
          )
        }
      </div>
      

      )
     }
     
       </div> 
   
    </div>
  )
}

export default EventDetailPage

