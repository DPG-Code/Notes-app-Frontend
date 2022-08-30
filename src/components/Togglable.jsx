import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonLabel = 'Show' }, ref ) => {
  const [visible, setVisible] = useState(false)

  const hidWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hidWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="mb-2 outline outline-offset-2 outline-black outline-2 bg-black text-white font-semibold rounded-xl text-sm px-6 py-1 text-center"
        >
          { buttonLabel }
        </button>
      </div>

      <div style={showWhenVisible} className="my-8 w-72 flex flex-col items-center justify-center">
        { children }
        <button
          onClick={toggleVisibility}
          className="text-neutral-600 font-normal rounded-lg text-sm w-full sm:w-auto text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Togglable