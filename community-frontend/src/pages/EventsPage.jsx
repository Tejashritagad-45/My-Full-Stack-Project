import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styles } from '../css/event.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const EventsPage = () => {
  const SERVER_URL =`${import.meta.env.VITE_API_URL}/event`
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const user=useSelector(state=>state.auth.user)

  useEffect(() => {
    async function handleEvent() {
      try {
        const response = await axios.get(SERVER_URL + "/all", { withCredentials:true }
          
        )
        console.log(response);
        setData(response.data.data.events)

      } catch (err) {
        console.log(err);

      }

    }
    handleEvent();
  }, [])


  async function handleSearch() {
    try {
      const res = await axios.get(SERVER_URL + "/all", {
        params: {
          keyword: searchTerm,
          city: city
        }


      })
      setSearchTerm("");
      setCity("");

      console.log(res);
      setData(res.data.data.events)
    } catch (error) {
      console.log(error);

    }


  }



  return (
    <div>

      <div className={styles.text}>
        <h1 className={styles.title} >"Connect, learn, and grow with like-minded people"...</h1>
        <p className={styles.para}>An event designed to inspire ideas and create opportunities!</p>

      </div>
        
     {/* {  
     (!user) ? (
        <Link to={"createEvents"}>
        <button className={styles.createBtn} disabled>Create Event</button>
      </Link>
       ):(
      <Link to={"createEvents"}>
        <button className={styles.createBtn}>Create Event</button>
      </Link>
       )
       } */}



       <button
         className={styles.createBtn}
         disabled={user?.role !=="host"}
         onClick={()=>{
            if (user){
              navigate("/events/createEvents")
            }
         }}
       >
         { 
         user ?"create Event":"login to create event"

         }
      </button>

     <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
        className={styles.input}
        // className="w-full max-w-md mx-auto block mb-6 px-4 py-2 border border-gray-300 rounded-2xl"
      />

      <input
        type="text"
        placeholder="Search keyWord.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
        className={styles.input}
        // className="w-full max-w-md mx-auto block mb-6 px-4 py-2 border border-gray-300 rounded-2xl"
      />

      

      <button
      onClick={handleSearch}
      className={styles.search}

      >
           Search 🔍
      </button>

      </div>



      <div className={styles.event}>
        {data.map((item, id) => {
          // <input type="text"  placeholder='search the Event'/>

          return <div key={id} className={styles.eventContainer}
            onClick={() => navigate(`/event/${item._id}`)}
          >

            <h2 className={styles.name}>{item.name}</h2>
            <h4 className={styles.comName}>{item.communityId.name}</h4>
            <h4 className={styles.city}>📍{item.city}</h4>
            <p className={styles.description}>📖{item.description}</p>
            <h4 className={styles.venue}>🏟 {item.venue}</h4>
            <h4 className={styles.time}>⏰{new Date(item.time).toLocaleString()}</h4>


          </div>


        })}
      </div>
    </div>



  )
}

export default EventsPage