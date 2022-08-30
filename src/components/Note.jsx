const colors = ["red-500", "green-500", "violet-500", "cyan-500", "yellow-300"]

export default function Note({ content, important, toggleImportance}) {
    const label = important
    ? 'make not important'
    : 'make important';

    // change, because render each time change state
    const color = `bg-${colors[Math.floor(Math.random() * colors.length)]}`
    console.log(color)

    return (
        <li className={`p-6 w-72 h-48 rounded-2xl ${color} flex flex-col items-start justify-between`}>
            <span className="text-2xl font-bold">{content}</span>
            <button
              onClick={toggleImportance}
              className="text-white outline-none bg-black font-semibold rounded-2xl text-xs px-4 py-2 text-center"
            >
              {label}
            </button>
        </li>
    )
}