import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ NEW STATES
  const [typingUsers, setTypingUsers] = useState({}); // { userId: true }

  const navigate = useNavigate();

  // axios base config
  axios.defaults.baseURL = backendUrl;

  // ================= AUTH CHECK =================
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch {
      // silent fail (landing safe)
    }
  };

  // ================= LOGIN =================
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        setAuthUser(data.userData);

        axios.defaults.headers.common["token"] = data.token;
        localStorage.setItem("token", data.token);
        setToken(data.token);

        connectSocket(data.userData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    setTypingUsers({});

    delete axios.defaults.headers.common["token"];

    socket?.disconnect();
    setSocket(null);

    toast.success("Logged out successfully");
    navigate("/"); // ✅ landing
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);

      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Update failed");
      }
      return data;
    } catch (error) {
      toast.error(error.message);
      return { success: false };
    }
  };

  // ================= SOCKET (VERCEL SAFE) =================
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      path: "/socket.io",
      transports: ["websocket"],
      query: { userId: userData._id },
    });

    setSocket(newSocket);

    // online users
    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    // typing indicator
    newSocket.on("typing", ({ from }) => {
      setTypingUsers((prev) => ({ ...prev, [from]: true }));
    });

    newSocket.on("stopTyping", ({ from }) => {
      setTypingUsers((prev) => ({ ...prev, [from]: false }));
    });

    newSocket.on("disconnect", () => {
      setOnlineUsers([]);
      setTypingUsers({});
    });
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (!token) return;
    axios.defaults.headers.common["token"] = token;
    checkAuth();
  }, [token]);

  // ================= CONTEXT VALUE =================
  return (
    <AuthContext.Provider
      value={{
        axios,
        authUser,
        onlineUsers,
        typingUsers,   // ✅ exposed
        socket,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
