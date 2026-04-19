import { createSlice } from "@reduxjs/toolkit"


const initialState={
    rsvpedEvents:[],
    myCreatedEvents:[],
}


const eventSlice=createSlice({
    name:"event",
    initialState,
    reducers:{
          rsvpEvent:(state,action)=>{
            const newEvent=action.payload
           if(!state.rsvpedEvents.find((event)=>String(event._id)===String(newEvent._id)))
            state.rsvpedEvents.push(newEvent)

          },
          cancelRsvpEvent:(state,action)=>{
            const {eventId}=action.payload
            state.rsvpedEvents=state.rsvpedEvents.filter((event)=>String(event._id) !=String(eventId))
          },

          addEvent:(state,action)=>{
             const newEvent=action.payload;
              state.myCreatedEvents.push(newEvent)
          },
          deleteEvent:(state,action)=>{
            const {eventId}=action.payload
            state.myCreatedEvents=state.myCreatedEvents.filter((event)=>event._id !=eventId);
          },

          setExistingEventDetails:(state,action)=>{
            const {rsvpedEvents,myCreatedEvents}=action.payload
            state.rsvpedEvents=rsvpedEvents
            state.myCreatedEvents=myCreatedEvents

          }
    }
})

export const {
    rsvpEvent,
    cancelRsvpEvent,
    addEvent,
    deleteEvent,
    setExistingEventDetails}=eventSlice.actions

    export default eventSlice.reducer

