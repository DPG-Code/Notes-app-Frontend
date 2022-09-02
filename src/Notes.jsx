import { useState } from 'react'
import Note from './components/Note'
import Loader from './components/Loaders'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'

const colors = ["red-500", "green-500", "violet-500", "cyan-500", "yellow-300"]

export default function Notes() {
  const {notes, loading, addNote, toggleImportanceOf, deleteOneNote} = useNotes()
  const { user, logout, login } = useUser()

  const [errorMessage, setErrorMessage] = useState('')
  const [showAll, setShowAll] = useState(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const toggleImportanceOfNote = (id) => {
    toggleImportanceOf(id) // hook
      .catch(() => {
        setErrorMessage(`Note was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  const deleteNoteFromDb = (id) => {
    deleteOneNote(id)
    .catch(() => {
      setErrorMessage(`Note dont exists`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      login({ username, password })
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    logout()
  }

  const color = `bg-${colors[Math.floor(Math.random() * colors.length)]}`

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div className="App min-h-screen flex flex-col items-center justify-start">
      <h1 className="mx-auto mt-14 text-6xl text-black font-normal">Notes</h1>

      <h3 className='error text-2xl text-red-700 font-semibold text-center'>{errorMessage}</h3>

      {
        user
        ? <>
          <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
          />
          <button
            onClick={handleLogout}
            className="text-black border-b-2 border-neutral-300 hover:border-black font-semibold text-sm absolute top-14 right-8"
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

      <section className='mb-14 px-6 w-full flex flex-col items-center justify-start   sm:px-24 sm:items-start'>
        <button
          className='mb-8 text-black outline outline-offset-2 outline-black outline-2 hover:bg-black hover:text-white font-semibold rounded-xl text-sm px-6 py-1 text-center'
          onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Important' : 'Show All'}
        </button>
        { loading
          ? <Loader />
          : <ol className='w-full flex items-start justify-center flex-wrap gap-12   sm:justify-start'>
              { notesToShow.map((note) => (
                  <Note
                    key={note.id}
                    {...note}
                    toggleImportance={() => toggleImportanceOfNote(note.id)}
                    deleteNote={() => deleteNoteFromDb(note.id)}
                    color={color}
                  /> // don't use index for id
                ))
              }
            </ol>
        }
      </section>
    </div>
  )
}