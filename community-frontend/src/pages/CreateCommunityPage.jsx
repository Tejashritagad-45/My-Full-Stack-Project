import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { styles } from '../css/createCommunity.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import{useSelector} from "react-redux"
import { setExistingDetails } from '../../store/slices/communitySlice.js'



const CreateCommunityPage = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_URL}/community`
  const [data, setData] = useState({
    name: "",
    category: "",
    description: ""
  })
  const [error, setError] = useState("")
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const communities=useSelector(state=>state.community)

  async function createCommunity() {
    try {
      const response = await axios.post(SERVER_URL + "/create", data, { withCredentials: true })
      console.log(response);
      setData({
        name: "",
        category: "",
        description: ""
      })
       
      const newCommunity=response?.data?.data?.data
      console.log("response",response.data);
      
      // dispatch(createCommunity(newCommunity))
      navigate(`/community/${newCommunity._id}`)

      dispatch(setExistingDetails({
        hostedCommunities:[
          ...(communities.hostedCommunities || []),
          newCommunity
        ]
      }))
      


    } catch (error) {
      console.log(error);


    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }

    });

    setError({
      ...error,
      [name]: ""
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createCommunity();
  }





  return (


    <div className={styles.createCom}>
      <div>
        <h1 className={styles.title}>Create Your Dream Community 💖</h1>
        <p className="text-gray-500 text-center mb-6 font-[merriwheather] text-xl">
          Bring people together around what you love.
          Start conversations, share knowledge, and create a space where ideas flourish.
        </p>
      </div>
      {/* <h1 className={styles.title}>Create Community </h1> */}
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <div>
          <span className={styles.label}>  Community Name</span>

          <input
            type="text"
            name='name'
            placeholder='write a community name'
            value={data.name}
            onChange={handleInput}
            className={styles.name}
          />
        </div>

        <div>
          <span className={styles.label}>  Description</span>


          <input type="text" name='description'
            placeholder='description'
            value={data.description}
            onChange={handleInput}
            className={styles.description}

          />
        </div>

        <div>
          <span className={styles.label}>category</span>


          <select name="category" onChange={handleInput} value={data.category} className={styles.category}>

            <option >Select</option>
            <option >Chess</option>
            <option >Mern</option>
            <option >Cooking</option>
            <option >Tech</option>
            <option >Jobs</option>
            <option >Sports</option>
            <option >Politics</option>

          </select>

        </div>
        
        <button className={styles.btn}>create Community</button>
        

      </form>
    </div>
  )
}

export default CreateCommunityPage