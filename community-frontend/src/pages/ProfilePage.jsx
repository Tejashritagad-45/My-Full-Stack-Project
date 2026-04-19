import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { makeHost } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setExistingDetails } from '../../store/slices/communitySlice';
import { setExistingEventDetails } from '../../store/slices/eventSlice';
import { styles } from '../css/profile.js';
const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user)
    console.log(user);

    const joinedCommunities = useSelector(state => state.community.joinedCommunities)
    const rsvpedEvents = useSelector(state => state.event.rsvpedEvents)
    // console.log(user);

    const SERVER_URL = `${import.meta.env.VITE_API_URL}/user`
    async function changeRole() {
        const response = await axios.patch(`${SERVER_URL}/make-host`,
            {}, { withCredentials: true }
        )
        console.log(response);
        dispatch(makeHost());
        const user = response?.data?.data?.user

        dispatch(setExistingDetails({
            joinedCommunities: user?.joinedCommunities
        }))



        dispatch(setExistingEventDetails({
            rsvpedEvents: user?.rsvpedEvents
        }))

        navigate("/host-Dashboard");

    }

    return (
        <div className={styles.profilePage}>
            <h1 className={styles.name}>{user?.name}</h1>
            <h4 className={styles.email}>{user?.email}</h4>
            <h4 className={styles.role}>{user?.role}</h4>
            <h2 className={styles.sectionTitle}>My joined Community</h2>
            <div className={styles.cardGrid}>
                {
                    joinedCommunities.length === 0 ? (
                        <p className={styles.para}>no joined Communities</p>
                    ) : (
                        joinedCommunities.map((joinCommunity) => {
                            return <div className={styles.community} key={joinCommunity._id}>
                                <p className={styles.cardName}>{joinCommunity.name}</p>
                            </div>
                        })
                    )
                }

            </div>
            <h1 className={styles.sectionTitle}>My Rsvp Events</h1>
            <div className={styles.cardGrid}>
                {
                    rsvpedEvents.length === 0 ? (
                        <p className={styles.para}>no joined events</p>
                    ) : (
                        rsvpedEvents.map((rsvpEvent) => {
                            return <div className={styles.event} key={rsvpEvent._id}>
                                <p className={styles.cardName}>{rsvpEvent.name}</p>
                            </div>
                        })
                    )
                }
            </div>

            <button
                className={styles.btn}
                onClick={changeRole}
                disabled={user?.role === "host"}
            >
                {user?.role === "host" ? "Already a Host" : "Make Host"}
            </button>

        </div>
    )
}

export default ProfilePage