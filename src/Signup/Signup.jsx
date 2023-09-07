import styles from './Signup.module.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import routes from '../Routes/routes.json'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const submitHandler = () => {
    const name1 = name.trim(' ')
    const username1 = username.trim(' ')
    const password1 = password.trim(' ')
    const token1 = token.trim(' ')
    if (name1.length == 0) {
      alert('Enter Valid Name')
    } else if (username1.length == 0) {
      alert('Enter Valid Username')
    } else if (password.length == 0) {
      alert('Enter Valid Password')
    } else if (token.length != 6) {
      alert('Enter Valid Six Digit Token')
    }
    const data = {
      name: name1,
      username: username1,
      password: password1,
      token: token1,
      images: []
    }
    axios.post("https://file-uploading-dipanshuraghuwa.december-node-2022.repl.co/auth/signup", { data: data }, { headers: { "Content-Type": "application/json", } })
      .then((data) => {
        alert(data.data.message)

      }).catch((err) => {
        console.log(err)
      })
    setName('')
    setUsername('')
    setPassword('')
    setToken('')
    navigate('/login')
  }

  const loginHandler = () => {
    navigate('/login')
  }

  return (<>
    <h2> Create Free Account  </h2>
    <div className={styles.outer}>

      <div className={styles.inner}>
        <label>Name - </label>
        <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Enter Name' required />
        <br />
        <br />
        <label>Username - </label>
        <input onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder='Enter Username' type='text' required />
        <br />
        <br />
        <label>Password - </label>
        <input onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder='Enter Password' type='text' required />

        <br />
        <br />
        <label>Token - </label>
        <input onChange={(e) => { setToken(e.target.value) }} value={token} placeholder='Enter 6 digit Token' type='number' required />
        <br />
        <br />
        <Button onClick={submitHandler} variant="primary">Signup</Button>
        <hr />
        <h6>Already have Account Click To Login Here</h6>
        <Button onClick={loginHandler} variant="warning">Login</Button>{' '}
      </div>
    </div>

  </>)
}
export default Signup