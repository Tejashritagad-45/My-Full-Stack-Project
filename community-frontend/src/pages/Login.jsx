import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import "../css/login.js"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { setExistingDetails } from '../../store/slices/communitySlice';
import { setExistingEventDetails } from '../../store/slices/eventSlice';
import { styles } from '../css/login.js';



const Login = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_URL}/user`
  const navigate = useNavigate();
  const [input, setInput] = useState({

    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const [msg, setMsg] = useState(null);
  const communities = useSelector(state => state.community)

  const [Errors, setError] = useState({});

  function valideform() {
    const errors = {}
    if (!input.email.trim()) {
      errors.email = "Enter a valid Email"

    }
    if (!/^\S+@\S+\.\S+$/.test(input.email)) {
      errors.email = "Enter a  valid Email "
    }
    if (!input.password.trim() || input.password.length < 6) {
      errors.password = "Enter a valid password"
    }
    setError(errors)
    return Object.keys(errors).length === 0;
  }

  async function handleLogin() {
    try {
      const response = await axios.post(SERVER_URL + "/login", input, {

        withCredentials: true
      })

      console.log({ response });
      console.log({ "response": response.data.data.user });


      const user = response.data.data.user;



      dispatch(login({ user }));

      // navigate("/communities")



      console.log({
        user,
        hostedCommunities: user?.hostedCommunities

      });
      // console.log({user, 
      //   joinedCommunities: user.joinedCommunities
      // });

      //saving joined and hosted communities of current user
      dispatch(setExistingDetails({
        joinedCommunities: user?.joinedCommunities || [],
        hostedCommunities: user?.hostedCommunities || []
      }));

      dispatch(setExistingEventDetails({
        rsvpedEvents: user?.rsvpedEvents || [],
        myCreatedEvents: user?.myCreatedEvents || []
      }))

      console.log(user);

      setMsg("user Login succesfully")
      setInput({
        email: "",
        password: ""
      })


    } catch (err) {
      setMsg(err.response?.data?.message || "user failed to Login")
      console.log(err.message);

    }


  }

  useEffect(() => {
    if (!user) return;
    if (user) {
      navigate("/communities")

    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valideform()) return
    handleLogin();

  }

  return (
    <div className={styles.authPage}>
      <div className={styles.gradientTop}></div>
      <div className={styles.gradientBottom}></div>


      <div className={styles.content}>
        <h1 className={styles.headingLeft}>Welcome to Your Community Hub 🌍</h1>

        <p className={styles.paragraph}>
          Find people who share your passion. Join communities, attend events,
          and create unforgettable experiences.
        </p >

        <p className={styles.paragraph}>
          Whether it's tech, sports, music, or cooking — there's something for everyone.
        </p>
      </div>

      <div className={styles.login}>
        <form onSubmit={handleSubmit} className={styles.form} >
          <h2 className={styles.title}>Welcome Back 👋</h2>

          <div className={styles.formContainer}>
            <label htmlFor="email" className={styles.label}> Email:</label>
            <input type="email"
              name='email'
              placeholder='enter a valid email'
              value={input.email}
              onChange={handleChange}
              className={styles.input}
            />
            {Errors.email && <p className='error'>{Errors.email}</p>
            }
          </div>

          <div className={styles.formContainer}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input type="password"
              name='password'
              placeholder='enter a valid password'
              value={input.password}
              onChange={handleChange}
              className={styles.input}
            />

            {Errors.password && <p className='error'> {Errors.password}</p>}
          </div>

          {/* <h2 className={styles.password} onClick={()=>navigate("/forgot-Password")}>forget password</h2> */}

          <button className={styles.btn}>login</button>
          <h2 className='message'>{msg}</h2>

          <p className={styles.msg}>
            Don’t have an account? <Link to={"/register"}>Register</Link> <span></span>




          </p>



        </form>
      </div>
    </div>
  )
}

export default Login