import { useParams } from "react-router-dom"

export default function NoteDetail({ notes }) {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  if(!note) return null

  return (
    <div>
      <h2>{note.content}</h2>
      <p>{note.user.username}</p>
      <strong>{note.important ? 'Important' : 'Not Important'}</strong>
    </div>
  )
}