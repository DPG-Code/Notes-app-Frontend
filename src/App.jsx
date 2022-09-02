import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { useUser } from './hooks/useUser'
import { useNotes } from "./hooks/useNotes"
import Notes from './Notes'
import Home from "./Pages/Home"
import Login from './Pages/Login'
import NoteDetail from "./components/NoteDetail"

const App = () => {
  const { notes } = useNotes()
  const { user } = useUser()

  return(
    <BrowserRouter>
      <header className="w-full h-16 px-8 flex items-center justify-between">
        <Link to="/" className="mr-4 text-lg border-b-2 border-neutral-300 hover:border-black">Home</Link>
        <Link to="/notes" className="mr-auto text-lg border-b-2 border-neutral-300 hover:border-black">Notes</Link>
        {
          user
          ? <p className="text-lg font-semibold">{user.username}</p>
          : <Link to="/login" className="text-white bg-black outline outline-offset-2 outline-black outline-2 font-semibold rounded-xl text-xs px-6 py-1 text-center">Login</Link>
        }
      </header>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<NoteDetail notes={notes}/>} />
        <Route path="/login" element={user ? null : <Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App