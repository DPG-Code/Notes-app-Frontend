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
      <header className="z-50 w-full h-16 bg-white px-4 flex items-center justify-between absolute top-0   sm:px-8">
        <Link to="/" className="mr-4 text-base border-b-2 text-black border-transparent font-semibold hover:border-black   sm:text-lg">Home</Link>
        <Link to="/notes" className="mr-auto text-base border-b-2 text-black border-transparent font-semibold hover:border-black   sm:text-lg">Notes</Link>
        {
          user
          ? <p className="text-base font-semibold text-black   sm:text-lg">{user.username}</p>
          : <Link to="/login" className="text-white bg-black outline outline-offset-2 outline-black outline-2 font-bold rounded-xl text-xs px-6 py-1 text-center">Login</Link>
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