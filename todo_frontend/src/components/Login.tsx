import React, {useState} from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import todosApi from "../api/todosApi";
import { useCookies } from 'react-cookie';
import Typography  from '@mui/material/Typography';

const Login = () => {
    const [ , setCookie] = useCookies();
    const [username, setUsername] = useState("")
    const [usernameErr, setUsernameErr] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState(false)
    const [msg, setMsg] = useState(null)
    function handleSubmit(event: any): any {
        event.preventDefault();
        setUsernameErr(false);
        setPasswordErr(false);
        const token = btoa(`${username}:${password}`)
        todosApi
          .get("", { headers: { "Content-Type": "application/json", "Authorization": `Basic ${token}`} })
          .then((response) => {
                var d = new Date()
                d.setTime(d.getTime() + 60*1000)
                setCookie('userToken',token,{expires:d})
          })
          .catch((err) => {
            if (err.response.status === 401) {
                setPasswordErr(true);
                setUsernameErr(true);
                setMsg(err.response.data.detail);
            }
          });
      }
    
      return (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <TextField
              required={true}
              id="user-name"
              label="User"
              value={username}
              error={usernameErr}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required={true}
              id="user-password"
              label="Password"
              type="password"
              value={password}
              error={passwordErr}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {msg ? <div><Typography>{msg}</Typography></div> : null}
          <div>
            <Button type="submit">Login</Button>
          </div>
        </Box>
      );
}

export default Login;