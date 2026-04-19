import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../css/createEvent.js';
import { addEvent} from '../../store/slices/eventSlice.js';
import { setExistingDetails } from '../../store/slices/communitySlice.js';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
    const SERVER_URL = `${import.meta.env.VITE_API_URL}/event`
    const [error, setError] = useState({})
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.auth.user)
    const [data, setData] = useState({
        name: "",
        description: "",
        city: "",
        venue: "",
        capacity: "",
        time: "",
        communityId: ""
    })
    async function createEventHandler() {
        try {
            const response = await axios.post(SERVER_URL + "/createEvents", data, { withCredentials: true })

            console.log(response);
            setData({
                name: "",
                description: "",
                city: "",
                venue: "",
                capacity: "",
                time: "",
                communityId: ""

            })


            const user = response?.data?.data?.event
            console.log('response',response.data);
            
            //    dispatch (setExistingDetails({
                  
            //        hostedCommunities:response?.data?.user?.hostedCommunities || []
            //    }))
            dispatch(addEvent(user))
            navigate(`/event/${user._id}`)
            

        } catch (error) {
            console.log(error);
        }
    }


    const handleInput = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }

        })


        setError({
            ...error,
            [name]: ""
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        createEventHandler();
    }



    const communities = useSelector(state => state.community);
    useEffect(() => {

        console.log({ communities });
    },[])

    const hostedCommunities = communities.hostedCommunities;

    return (
        <div className={styles.form}>
            <div className={styles.contentSection} >
                <h1 className={styles.mainTitle}>Create an Unforgettable Event ✨</h1>
                <p className={styles.mainSubtitle}>
                    Turn your ideas into experiences. Bring people together, share moments,
                    and create something meaningful that your community will remember.
                </p>

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-[1px] w-20 bg-pink-500"></div>
                    <span className="text-xs uppercase tracking-widest text-pink-600 font-bold">Host with Style</span>
                </div>
            </div>
            <div className={styles.formContainer}>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Event Name</label>
                        <input type="text" placeholder='e.g. Midnight Chess Session' name='name' value={data.name} onChange={handleInput} className={styles.name} />
                    </div>


                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Description</label>
                        <textarea placeholder='What should guests expect?' name='description' value={data.description} onChange={handleInput} className={styles.description} />
                    </div>


                    <div className={styles.gridGroup}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>City</label>
                            <input type="text" placeholder='Mumbai' name='city' value={data.city} onChange={handleInput} className={styles.city} />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Venue</label>
                            <input type="text" placeholder='Skyline Cafe' name="venue" value={data.venue} onChange={handleInput} className={styles.venue} />
                        </div>
                    </div>


                    <div className={styles.gridGroup}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Capacity</label>
                            <input type="number" placeholder='50' name='capacity' value={data.capacity} onChange={handleInput} className={styles.capacity} />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Time</label>
                            <input type="datetime-local" name='time' value={data.time} onChange={handleInput} className={styles.time} />
                        </div>
                    </div>


                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Hosting Community</label>
                        <select name='communityId' value={data.communityId} onChange={handleInput} className={styles.community}>
                            <option value="">Select a community</option>
                            {hostedCommunities?.map((comm) => (
                                <option key={comm._id} value={comm._id}>{comm.name}</option>
                            ))}
                        </select>
                    </div>

                    <button className={styles.btn}
                 >Publish Event</button>
                </form>
            </div>
        </div>

    )
}

export default CreateEventPage