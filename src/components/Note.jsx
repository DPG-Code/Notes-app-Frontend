// const colors = ["bg-red-500", "bg-green-500", "bg-violet-500", "bg-cyan-500", "bg-yellow-300"]
import { Link } from "react-router-dom";

export default function Note({ content, important, id, date, toggleImportance, color}) {
    const label = important
    ? 'make not important'
    : 'make important';

    const dateFormat = date.slice(0, 10)

    return (
        <li>
          <Link to={`/notes/${id}`} className={`p-6 w-72 h-48 rounded-2xl ${color} flex flex-col items-start justify-between`}>
              <span className="text-2xl font-bold">{content}</span>
              <div className="w-full flex items-center justify-between">
                <button
                  onClick={toggleImportance}
                  className="text-white outline-none bg-black font-semibold rounded-2xl text-xs px-4 py-2 text-center"
                >
                  {label}
                </button>
                <p>{dateFormat}</p>
              </div>
          </Link>
        </li>
    )
}