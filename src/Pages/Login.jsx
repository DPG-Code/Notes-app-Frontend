import { useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNotAppUser',
        JSON.stringify(user)
      )

      noteService.setToke(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      navigate('/notes')
    } catch (error) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  if(user) return <p className='error my-8 text-2xl text-black text-center'>User is Logged!!!</p>
  if (errorMessage) return <p className='error my-8 text-2xl text-red-700 font-semibold text-center'>{errorMessage}</p>

  return (
    <>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleSubmit={handleLogin}
      />
    </>
  )
}