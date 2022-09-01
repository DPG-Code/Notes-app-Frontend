import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import NoteDetail from "./components/NoteDetail"
import Notes from './Notes'
import Login from './Login'
import { useUser } from './hooks/useUser'
import { useNotes } from "./hooks/useNotes"

const Home = () => <h1>Home</h1>
const Users = () => <h1>Users</h1>

const App = () => {
  const { notes } = useNotes()
  const { user } = useUser()

  return(
    <BrowserRouter>
      <header>
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/users">Users</Link>
        {
          user
          ? <em>{user.username}</em>
          : <Link to="/login">Login</Link>
        }
      </header>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<NoteDetail notes={notes}/>} />
        <Route path="/users" element={<Users />}/>
        <Route path="/login" element={user ? null : <Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App