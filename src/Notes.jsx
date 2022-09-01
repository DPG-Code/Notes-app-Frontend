import { useState } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'

const colors = ["red-500", "green-500", "violet-500", "cyan-500", "yellow-300"]

export default function Notes() {
  const {notes, loading, addNote, toggleImportanceOf} = useNotes()
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

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      login({ username, password })
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
    logout()
  }

  const color = `bg-${colors[Math.floor(Math.random() * colors.length)]}`

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

      <section className='my-10 px-24 w-full flex flex-col items-start justify-start'>
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
                    toggleImportance={() => toggleImportanceOfNote(note.id)}
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