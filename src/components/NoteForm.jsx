import React from 'react'
import { useRef, useState } from "react"
import Togglable from "./Togglable"

export default function NoteForm({ addNote }) {
  const [newNote, setNewNote] = useState('')

  const togglableRef = useRef()

  const contentNote = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteAdd = {
      content : newNote,
      important: false
    }

    addNote(noteAdd)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='New Note' ref={togglableRef}>
      <h2 className='mx-auto mb-4 text-xl text-black font-bold'>Create New Note</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
        <input
          className="mb-6 border border-neutral-400 text-black placeholder-gray-400 outline-none text-sm rounded-xl block w-full px-4 py-2"
          type="text"
          onChange={contentNote}
          value={newNote}
          name="content-note"
          placeholder="Write your new Note"
        />
        <button
          id="form-note-button"
          className="mb-4 outline outline-offset-2 outline-black outline-2 bg-black text-white font-semibold rounded-xl text-sm px-6 py-1 text-center"
        >
          Add note
        </button>
      </form>
    </Togglable>
  )
}