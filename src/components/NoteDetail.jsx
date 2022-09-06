import { useParams } from "react-router-dom"

const colors = ["red-500", "green-500", "violet-500", "cyan-500", "yellow-300"]

export default function NoteDetail({ notes }) {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  if(!note) return null

  const dateFormat = note.date.slice(0, 10)
  const colorIndex = Number(note.color) - 1
  const colorBackground = `bg-${colors[colorIndex]}`
  const colorOutline = `outline-${colors[colorIndex]}`

  return (
    <div className="px-8 w-full h-full absolute flex">
      <div className={`m-auto py-6 px-4 ${colorBackground} ${colorOutline} flex flex-col items-center rounded-xl outline outline-offset-4 outline-4   sm:w-auto sm:max-w-fit sm:px-8`}>
        <h2 className="mb-8 text-3xl text-center font-bold sm:text-4xl">{note.content}</h2>
        <p className="text-xl text-center font-bold"> <span className="text-lg font-normal">user:</span> {note.user.username}</p>
        <p className="text-base text-center font-bold"><span className="font-normal">date:</span> {dateFormat}</p>
        <strong className="text-base text-center">{note.important ? 'Important' : 'Not Important'}</strong>
      </div>
    </div>
  )
}