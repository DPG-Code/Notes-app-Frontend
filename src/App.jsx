import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

import 'flowbite'

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

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div className="App min-h-screen flex flex-col items-center justify-start">
      <h1 className="mx-auto my-10 text-6xl text-black font-normal">Notes</h1>

      <h3 className='error'>{errorMessage}</h3>

      {
        user
        ? <>
          <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
          />
          <button
            onClick={handleLogout}
            className="text-black outline outline-offset-2 outline-black outline-2 hover:bg-black hover:text-white font-semibold rounded-xl text-sm px-6 py-1 text-center absolute top-6 right-6"
          >
            Logout
          </button>
        </>
        : <LoginForm
          username={username}
          password={password}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          handleSubmit={handleLogin}
        />
      }

      <section className='mt-10 px-24 w-full flex flex-col items-start justify-start'>
        <button
          className='mb-8 text-black outline outline-offset-2 outline-black outline-2 hover:bg-black hover:text-white font-semibold rounded-xl text-sm px-6 py-1 text-center'
          onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Important' : 'Show All'}
        </button>
        { loading
          ? <p>Loading...</p>
          : <ol className='w-full flex flex-wrap gap-12'>
              { notesToShow.map((note) => (
                  <Note
                    key={note.id}
                    {...note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                  /> // don't use index for id
                ))
              }
            </ol>
        }
      </section>
    </div>
  )
}