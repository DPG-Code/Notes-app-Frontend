import Togglable from "./Togglable"
import PropTypes from 'prop-types'

export default function LoginForm({ handleSubmit, handleUsernameChange, username, handlePasswordChange, password }) {
  return (
    <Togglable buttonLabel='Show Login'>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
          <input
            className="mb-6 border border-gray-300 text-black placeholder-gray-400 outline-none text-sm rounded-xl block w-full px-4 py-2"
            type="text"
            onChange={handleUsernameChange}
            value={username}
            name="username"
            placeholder="username"
          />
          <input
            className="mb-6 border border-gray-300 text-black placeholder-gray-400 outline-none text-sm rounded-xl block w-full px-4 py-2"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            placeholder="password"
          />
          <button
            id='form-login-button'
            className="mb-4 outline outline-offset-2 outline-black outline-2 bg-black text-white font-semibold rounded-xl text-sm px-6 py-1 text-center"
          >
            Login
          </button>
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