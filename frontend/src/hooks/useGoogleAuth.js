// hooks/useGoogleAuth.js
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "../axiosConfig"; // Assuming axiosConfig.js is correctly configured

const useGoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setUser(response);
    },
    onError: (error) => {
      setError("Login Failed: " + error.message);
    },
  });

  const getUserProfile = async () => {
    try {
      const res = await axios.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtAccessToken")}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      setError("Error fetching profile: " + err.message);
    }
  };

  const fetchGoogleProfileAndSaveUser = async (userData) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const profileData = res.data;

      const loginResponse = await axios.post("/auth/login", {
        google_id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        picture: profileData.picture,
      });

      //get and set the JWT token
      const { token, user } = loginResponse.data;
      localStorage.setItem("jwtAccessToken", token);
      setProfile(user);
    } catch (error) {
      setError("Error during login or fetching profile: " + error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwtAccessToken")) {
      getUserProfile();
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchGoogleProfileAndSaveUser(user);
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    localStorage.removeItem("jwtAccessToken");
    setProfile(null);
  };

  return { profile, login, logOut, error };
};

export default useGoogleAuth;
