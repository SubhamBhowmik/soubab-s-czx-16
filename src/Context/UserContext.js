import React, { createContext, useContext, useReducer, useEffect } from "react";

const UserContext = createContext();

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const updateUser = (payload) => {
    dispatch({ type: "UPDATE_USER", payload });
  };

  useEffect(() => {
    // Load user data from storage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      updateUser(storedUser);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Save user data to storage whenever it changes
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]); // Dependency ensures this runs whenever user data changes

  return (
    <UserContext.Provider value={{ user: state.user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
