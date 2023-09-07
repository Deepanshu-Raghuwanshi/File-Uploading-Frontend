import styles from './Login.module.css'
import Button from 'react-bootstrap/Button';
import routes from '../Routes/routes.json'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {

  const navigate = useNavigate()
  const [username, setUserame] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    const username1 = username.trim(' ')
    const password1 = password.trim(' ')

    if (username1.length == 0) {
      alert('Enter Valid Username')
    } else if (password1.length == 0) {
      alert('Enter Valid Password')
    }
    const data = {
      username: username1,
      password: password1
    }
   
    axios.post("https://file-uploading-dipanshuraghuwa.december-node-2022.repl.co/auth/login", { data: data }, { headers: { "Content-Type": "application/json", } })
      .then((data) => {

        alert(data.data.message)

      }).catch((err) => {
        alert('Invalid Username Password')
      })

    setUserame('')
    setPassword('')
    navigate('/profile', { state: data })

  }

  const submitHandler = () => {
    navigate('/signup')
  }

  return (
    <>
      <h2> Login Here  </h2>
      <div className={styles.outer}>

        <div className={styles.inner}>
          <label>Username - </label>
          <input onChange={(e) => { setUserame(e.target.value) }} value={username} type='text' placeholder='Enter Name' required />
          <br />
          <br />

          <label>Password - </label>
          <input onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password' value={password} type='text' required />
          <br />
          <br />

          <Button onClick={loginHandler} variant="warning">Login</Button>{' '}

          <hr />
          <h6>Don't Have Account Create One For Free</h6>
          <Button onClick={submitHandler} variant="primary">Signup</Button>
        </div>


      </div>

    </>

  )

}
export default Login;