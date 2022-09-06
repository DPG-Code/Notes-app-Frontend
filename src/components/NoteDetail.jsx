import { useParams } from "react-router-dom"

const colors = ["red-bg", "green-bg", "violet-bg", "cyan-bg", "yellow-bg"]
const colorsOutline = ["red-outline", "green-outline", "violet-outline", "cyan-outline", "yellow-outline"]

export default function NoteDetail({ notes }) {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  if(!note) return null

  const dateFormat = note.date.slice(0, 10)
  
  let colorBackground;
  let colorOutline;

  switch (note.color) {
    case "0":
      colorBackground = colors[0]
      break;
    case "1":
      colorBackground = colors[1]
      break;
    case "2":
      colorBackground = colors[2]
      break;
    case "3":
      colorBackground = colors[3]
      break;
    default:
      colorBackground = colors[4]
      break;
  }

  switch (note.color) {
    case "0":
      colorOutline = colorsOutline[0]
      break;
    case "1":
      colorOutline = colorsOutline[1]
      break;
    case "2":
      colorOutline = colorsOutline[2]
      break;
    case "3":
      colorOutline = colorsOutline[3]
      break;
    default:
      colorOutline = colorsOutline[4]
      break;
  }

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