// import React, { createContext, useContext, useReducer, useEffect } from "react";

// const ProfileIdContext = createContext();

// const initialState = {
//   profileId: "",
// };

// const profileIdReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_PROFILEID":
//       return { ...state, profileId: { ...state.profileId, ...action.payload } };
//     default:
//       return state;
//   }
// };

// export const ProfileIdProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(profileIdReducer, initialState);

//   const updateProfileId = (payload) => {
//     dispatch({ type: "UPDATE_PROFILEID", payload });
//   };

//   useEffect(() => {
//     // Your initialization logic if needed
//     console.log("Changed", state.profileId);
//   }, [state.profileId]);

//   useEffect(() => {
//     // Load user data from storage when the component mounts
//     // const storedProfileId = JSON.parse(localStorage.getItem("profileId"));
//     const storedProfileId = localStorage.getItem("profileId");
//     if (storedProfileId) {
//       updateProfileId(storedProfileId);
//     }
//   }, []);
//   useEffect(() => {
//     // Save user data to storage whenever it changes
//     localStorage.setItem("user", JSON.stringify(state.profileId));
//   }, [state.profileId]); // Dependency ensures this runs whenever user data changes

//   return (
//     <ProfileIdContext.Provider
//       value={{ profileId: state.profileId, updateProfileId }}
//     >
//       {children}
//     </ProfileIdContext.Provider>
//   );
// };

// export const useProfileId = () => {
//   return useContext(ProfileIdContext);
// };
