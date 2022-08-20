import { useState, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {

  const [loading,setLoading] = useState(true)
  const [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const [user, setUser] = useState(() => localStorage.getItem('token') ? jwt_decode(token.access) : null)

  const [error, SetError] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const reqData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    let res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
    });
    console.log(res);
    const data = await res.json();
    if (res.status == 400) SetError(data);
    else {
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data));
      setToken(data);
      setUser(jwt_decode(data.access));
      navigate("/");
    }
  };


  const logoutUser = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    navigate('/login/')
  }


  const updateToken = async () => {

    // console.log('updateTokenCalled')
    let res = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({'refresh':token?.refresh}),
    });
    const data = await res.json();
    if (res.status === 200)
    {
      setToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("token", JSON.stringify(data));
    }else 
    {
      logoutUser()
    }

    if(loading)
    {
      setLoading(false)
    }
  }

  useEffect(()=>{

    if(loading){
      token ? updateToken() : setLoading(false)
    }

    let interval = setInterval(()=>{
      if(token) {
        updateToken()
      }
    },240000)

    return ()=> clearInterval(interval)

  },[token,loading])




  let contextData = {
    loginUser: loginUser,
    error: error,
    user: user,
    token:token,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
  );
};
