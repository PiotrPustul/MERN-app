import ReactDOM from 'react-dom'

import './Backdrop.css'

const Backdrop = (props) => {
  const content = <div className='backdrop' onClick={props.onClick}></div>
  const htmlElement = document.getElementById('backdrop-hook')

  return ReactDOM.createPortal(content, htmlElement)
}

export default Backdrop
