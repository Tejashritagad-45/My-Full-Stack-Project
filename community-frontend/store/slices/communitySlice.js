import {createSlice} from "@reduxjs/toolkit"

const initialState={
    // allCommunities:[],
    joinedCommunities:[],
    hostedCommunities:[],

}


const communitiesSlice=createSlice({
    name:"communities",
    initialState,
    reducers:{
        joinCommunities:(state,action)=>{
            if(
                !state.joinedCommunities.find((community)=>community._id===action.payload._id)
            )
            state.joinedCommunities.push(action.payload)


        },
        leaveCommunity:(state,action)=>{
            const {communityId}=action.payload;
            state.joinedCommunities=state.joinedCommunities.filter(
                (community)=>community._id !==communityId
            );

        },

        createCommunity:(state,action)=>{
            const {newCommunity}=action.payload;
            state.hostedCommunities.push(newCommunity);
        },

        deleteCommunity:(state,action)=>{
            const {communityId}=action.payload
            state.hostedCommunities=state.hostedCommunities.filter((community)=>community._id!==communityId)

        },
        // this action will be called after succefully login so that existing details can be prefilled 
        setExistingDetails:(state,action)=>{
            const {joinedCommunities,hostedCommunities}=action.payload
            state.joinedCommunities=joinedCommunities
            state.hostedCommunities=hostedCommunities

        }
    }

})

 export const {
    joinCommunities,
    leaveCommunity,
    createCommunity,
    deleteCommunity,
    setExistingDetails}=communitiesSlice.actions
 export default communitiesSlice.reducer