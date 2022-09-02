import { useParams } from "react-router-dom"

export default function NoteDetail({ notes }) {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  if(!note) return null

  const dateFormat = note.date.slice(0, 10)

  return (
    <div className="mt-8 mx-auto py-6 px-4 w-64 flex flex-col items-center border-solid border-black border-2 rounded-xl   sm:w-auto sm:max-w-fit sm:px-8">
      <h2 className="mb-4 text-3xl text-center font-bold sm:text-5xl">{note.content}</h2>
      <p className="mb-6 text-xl text-center">Username: {note.user.username}</p>
      <p className="text-base text-center">Date: {dateFormat}</p>
      <strong className="text-base text-center">{note.important ? 'Important' : 'Not Important'}</strong>
    </div>
  )
}