import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  //Function to fetch user data
  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/profile", {
      credentials: "include",
    });
    const data = await response.json();
    setUser(data);
  };

  const Logout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, Logout }}>
      {children}
    </UserContext.Provider>
  );
};
