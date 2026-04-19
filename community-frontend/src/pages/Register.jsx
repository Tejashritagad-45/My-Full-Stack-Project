import React from 'react'
import { useState } from 'react'
import axios from "axios"
import "../css/register.js"
import { Link, useNavigate } from 'react-router-dom'
import { setExistingDetails } from '../../store/slices/communitySlice'
import { login } from '../../store/slices/authSlice'
import { setExistingEventDetails } from '../../store/slices/eventSlice'
import { useDispatch } from 'react-redux'
import { styles } from '../css/register.js'

const Register = () => {
    const SERVER_URL = `${import.meta.env.VITE_API_URL}/user`
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""

    });
    const [message, setMessage] = useState(null)
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate=useNavigate();
    // const navigate = useNavigate();



    function valideform() {
        const Errors = {};
        if (!data.name.trim()) {
            Errors.name = ("Name is required");

        }
        else if (data.name.length <= 10 || data.name.length >= 100) {
            Errors.name = ("name length is a atleast 10 character")
        }

        if (!data.email.trim()) {
            Errors.email = ("Email is required")
        }
        else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            Errors.email = ("enter a valid email")
        }

        if (!data.password) {
            Errors.password = ("password is required")
        } else if (data.password.length < 6) {
            Errors.password = ("password must be at least 6 character")
        }
        setError(Errors)
        return Object.keys(Errors).length === 0
    }



    async function handleRegister() {
        try {
            const response = await axios.post(SERVER_URL + "/register", data,{withCredentials:true})
            console.log(response);
            setMessage("User Register Succesfully ✅")
            const user = response?.data?.data?.user;

            setData({
                name: "",
                email: "",
                password: ""
            });


            dispatch(login({ user }));
            dispatch(setExistingDetails({ joinedCommunities: user?.joinedCommunities, hostedCommunities: user?.hostedCommunities }));
            dispatch(setExistingEventDetails({ rsvpedEvents: user?.rsvpedEvents ,myCreatedEvents:user?.myCreatedEvents}))

            console.log(user);
            console.log({ user, joinedCommunities: user?.joinedCommunities });

            navigate("/communities")

            




        } catch (error) {
            setMessage(error.message || "Registrtion is failed")
            console.log("error occured", error.response);
            console.log("error", error);


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
            [name]: "",

        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!valideform()) return
        handleRegister();
        // console.log(data);
    }


    return (
        <div className={styles.container}>
            <div className={styles.gradientTop}></div>
      <div className={styles.gradientBottom}></div>


            <div  className={styles.content}>
                <h1 className={styles.headingLeft}>Welcome to Your Community Hub 🌍</h1>

                <p className={styles.paragraph}>
                    Find people who share your passion. Join communities, attend events,
                    and create unforgettable experiences.
                </p >

                <p className={styles.paragraph}>
                    Whether it's tech, sports, music, or cooking — there's something for everyone.
                </p>
            </div>

            <form className={styles.registerForm} onSubmit={handleSubmit} >
                <h1 className={styles.heading}>Sign Up</h1>
                <label
                    className={styles.label}
                    htmlFor="Name" >
                    Name
                </label>

                <input
                    className={styles.inputField}
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    placeholder='enter a name'
                    onChange={handleInput} />
                {error.name && <p style={{ color: "red" }}>{error.name}</p>}

                <label
                    className={styles.label}
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className={styles.inputField}
                    type="text" name='email'
                    id='email' value={data.email}
                    placeholder='enter a Email'
                    onChange={handleInput} />

                {error.email && <p style={{ color: "red" }}>{error.email}</p>}

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                  className={styles.inputField}
                    type="password" name='password'
                    id='password' value={data.password}
                    placeholder='enter a password'
                    onChange={handleInput} />
                {error.password && <p style={{ color: "red" }}>{error.password}</p>}

                <button className={styles.btn}>Register</button>
                <p className={styles.para}>Already have an account? <Link to={"/login"}>login</Link>
                </p>

                <h2>{message}</h2>
            </form>



        </div>
    )
}

export default Register;