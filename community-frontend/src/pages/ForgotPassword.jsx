import axios from 'axios'
import React, { useState } from 'react'

const ForgotPassword = () => {
    const SERVER_URL = `${import.meta.env.VITE_API_URL}/user`
    console.log(SERVER_URL);
    
    const [email, setEmail] = useState("");

    async function forgotPasswordHandler() {
        try {
            const response =await axios.post(`${SERVER_URL}/forgot-password`,
                {email}, 
                { withCredentials: true }
            )
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>

            Email
            <input type="text" placeholder='enter a Email' value={email}
                onChange={(e) => setEmail(e.target.value)}
            />


            <button onClick={forgotPasswordHandler}>send a recetURL</button>
        </div>
    )
}

export default ForgotPassword