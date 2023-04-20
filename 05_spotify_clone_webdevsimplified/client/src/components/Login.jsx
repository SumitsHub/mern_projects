import React from "react";
import {Container} from 'react-bootstrap';

const client_id = 'a50ce8f9b6d2475a81bd4b79e0fdd267';

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=a50ce8f9b6d2475a81bd4b79e0fdd267&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function Login() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with spotify
      </a>
    </Container>
  )
  ;
}

export default Login;
