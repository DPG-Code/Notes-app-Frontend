import { useState } from 'react'
import Note from './components/Note'
import Loader from './components/Loaders'
import NoteForm from './components/NoteForm'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'

export default function Notes() {
  const {notes, loading, addNote, toggleImportanceOf, deleteOneNote} = useNotes()
  const { user, logout } = useUser()

  const [errorMessage, setErrorMessage] = useState('')
  const [showAll, setShowAll] = useState(true)

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

  const handleLogout = () => {
    logout()
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const NotesToRender = () => {
    return ( loading
      ? <Loader />
      : <ol className='w-full flex items-start justify-center flex-wrap gap-12   sm:justify-start'>
          { notesToShow.map((note) => (
              <Note
                key={note.id}
                {...note}
                toggleImportance={() => toggleImportanceOfNote(note.id)}
                deleteNote={() => deleteNoteFromDb(note.id)}
              /> // don't use index for id
            ))
          }
        </ol>
    )
  }

  return (
    <div className="App min-h-screen flex flex-col items-center justify-start">
      <h1 className="mx-auto mt-20 text-6xl text-black font-normal">Notes</h1>

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
            className="text-black border-b-2 border-white hover:border-black font-semibold text-base absolute top-16 right-8"
          >
            Logout
          </button>
        </>
        : <h3 className="my-16 text-2xl text-violet-500 font-semibold">Login for create a new Note</h3>
      }

      <section className='mb-14 px-6 w-full flex flex-col items-center justify-start   sm:px-24 sm:items-start'>
        {
          user
          ? <>
            <button
              className='mb-8 text-black outline outline-offset-2 outline-black outline-2 hover:bg-black hover:text-white font-semibold rounded-xl text-sm px-6 py-1 text-center'
              onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Important' : 'Show All'}
            </button>
            <NotesToRender />
          </>
          : null
        }
        
      </section>
    </div>
  )
}