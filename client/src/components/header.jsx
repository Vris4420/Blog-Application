
import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "../userContext";

export default function Header(){
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch('http://localhost:8080/profile', {
      credentials:'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  },[])

  function logout() {
    fetch('http://localhost:8080/logout', {
        credentials: 'include',
        method: 'POST',
    })
    .then(() => {
        setUserInfo(null); // Update user info after logout completes
    })
    .catch(error => {
        console.error('Logout failed:', error);
    });
}

  const username = userInfo?.username;

    return(
        <header>
        <Link to="/" className="logo">My Blog</Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    )
}