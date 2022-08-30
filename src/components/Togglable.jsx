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
        <button onClick={toggleVisibility}>{ buttonLabel }</button>
      </div>

      <div style={showWhenVisible}>
        { children }
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Togglable