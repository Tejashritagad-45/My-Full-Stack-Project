import axios from 'axios'
// import "../css/register.css"
// import "../css/communityPage.css"

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { styles } from '../css/communityPage.js';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const CommunitiesPage = () => {
  const [data, setData] = useState([]);
  const SERVER_URL =`${import.meta.env.VITE_API_URL}/community`
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    async function handleCommunities() {

      try {
        const response = await axios.get(SERVER_URL + "/all",{withCredentials:true})
        console.log(response.data);
        setData(response?.data?.data?.communities)

      } catch (error) {
        console.log(error);

      }

    }
    handleCommunities()
  }, [])

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1 className={styles.title}> “✨ Explore Communities That Match Your Vibe”</h1>

        <p className={styles.des}> 🤝Discover, join, and grow with communities built around your interests.
          🚀From tech to creativity—your next connection starts here.</p>
      </div>


      <Link to={"/communities/create"}>
        <div title={user?.role !== "host" ? "Only host allowed" : ""}>
          <button
            className={styles.createbtn}
            disabled={user?.role !== "host"}
          >
            Create Community
          </button>
        </div>


      </Link>






      <div className={styles.gridLayout}>
        {
          Array.isArray(data) && data.map((item, index) => {
            return (
              <Link to={`/community/${item._id}`}
                key={item._id}>


                <div className={styles.card} >
                  <h2 className={styles.category}>{item.category}</h2>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.description}>📖{item.description}</p>

                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  )
}

export default CommunitiesPage