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
      <h2>Create New Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={contentNote}
          value={newNote}
          name="content-note"
          placeholder="Write your new Note"
        />
        <button id="form-note-button">Add note</button>
      </form>
    </Togglable>
  )
}