import React, { createContext, useContext, useReducer, useEffect } from "react";

const UserContext = createContext();

const initialState = {
  user: null,
  profileId: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "UPDATE_PROFILE_ID":
      return { ...state, profileId: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const updateUser = (payload) => {
    dispatch({ type: "UPDATE_USER", payload });
  };

  const updateProfileId = (newProfileId) => {
    dispatch({ type: "UPDATE_PROFILE_ID", payload: newProfileId });
  };

  useEffect(() => {
    // Load user data and profileId from storage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedProfileId = JSON.parse(localStorage.getItem("profileId"));
    if (storedUser) {
      updateUser(storedUser);
    }
    if (storedProfileId) {
      updateProfileId(storedProfileId);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Save user data to storage whenever it changes
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]); // Dependency ensures this runs whenever user data changes

  useEffect(() => {
    // Save profileId to storage whenever it changes
    localStorage.setItem("profileId", JSON.stringify(state.profileId));
  }, [state.profileId]); // Dependency ensures this runs whenever profileId changes

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        profileId: state.profileId,
        updateUser,
        updateProfileId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
