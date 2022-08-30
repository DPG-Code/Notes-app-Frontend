import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

export default function App() {
  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAll, setShowAll] = useState(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    noteService
      .getAll()
      .then((notes) => {
        setNotes(notes)
        setLoading(false)
        }
      )
  }, [])

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggedNotAppUser')
    if(loggedJSON) {
      const user = JSON.parse(loggedJSON)
      setUser(user)
      noteService.setToke(user.token)
    }
  }, [])

  const addNote = (noteAdd) => {
    noteService
      .create(noteAdd)
      .then((newNote) => {
        setNotes((prevNotes => [...prevNotes, newNote]))
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log(changedNote)
  }

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
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToke(user.token)
    window.localStorage.removeItem('loggedNotAppUser')
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <h3 className='error'>{errorMessage}</h3>

      {
        user
        ? <>
          <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
          />
          <button onClick={handleLogout}>Logout</button>
        </>
        : <LoginForm
          username={username}
          password={password}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          handleSubmit={handleLogin}
        />
      }


      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Important' : 'Show All'}</button>
      { loading
        ? <p>Loading...</p>
        : <ol>
            { notes.map((note) => (
                <Note
                  key={note.id}
                  {...note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                /> // don't use index for id
              ))
            }
          </ol>
      }
    </div>
  )
}