import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expirenIn, setExpirenIn] = useState();
  const ref = useRef();

  useEffect(() => {
      if(ref.current) return;
    axios
      .post("http://localhost:5000/login", {
        code,
      })
      .then((res) => {
        console.log(res);
        ref.current = true;
      })
      .catch((err) => {
          console.log(err)
        // window.location = "/";
      });
  }, [code]);
  return <div>useAuth</div>;
}

export default useAuth;
