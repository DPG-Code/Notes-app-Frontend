import { useParams } from "react-router-dom"

const colors = ["blue-text", "violet-text", "yellow-text", "rose-text", "bone-text"]

export default function NoteDetail({ notes }) {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  if(!note) return null

  const dateFormat = note.date.slice(0, 10)
  let colorBackground;

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

  return (
    <main className="NoteDetail px-10 w-full h-full absolute flex">
      <section className='m-auto p-8 w-full max-w-[900px] bg-[#2E2C33] flex flex-col items-start rounded-2xl relative'>
        <h2 className={`FontSemibold mb-6 text-3xl ${colorBackground} sm:text-4xl   xl:mb:12 xl:text-7xl`}>{note.content}</h2>
        <h3 className="FontLight mb-4 text-lg text-[#F2F2F2]   xl:mb-6 xl:text-4xl">{note.description}</h3>
        <p className="text-xl text-[#F2F2F2]   xl:mb-2 xl:text-3xl">{note.user.username}</p>
        <small className="FontThin text-sm text-[#CECCCC]   xl:text-xl">{dateFormat}</small>
        <div className='absolute bottom-8 right-8'>
          { note.important
            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F2F2F2" className="w-8 h-8   xl:w-12 xl:h-12">
                <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
              </svg>        
            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#F2F2F2" className="w-8 h-8   xl:w-12 xl:h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>          
          }
        </div>
      </section>
    </main>
  )
}