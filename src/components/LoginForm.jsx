import Togglable from "./Togglable"
import PropTypes from 'prop-types'

export default function LoginForm({ handleSubmit, handleUsernameChange, username, handlePasswordChange, password }) {
  return (
    <Togglable buttonLabel='Show Login'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleUsernameChange}
            value={username}
            name="username"
            placeholder="username"
          />
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            placeholder="password"
          />
          <button id='form-login-button'>Login</button>
        </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}