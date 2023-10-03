import { useRef } from 'react'
import ReactDOM from 'react-dom'

import { CSSTransition } from 'react-transition-group'
import './SideDrawer.css'

const SideDrawer = (props) => {
  const nodeRef = useRef(null)
  const htmlElement = document.getElementById('drawer-hook')
  const content = (
    <CSSTransition
      in={props.show}
      nodeRef={nodeRef}
      timeout={400}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside className='side-drawer' ref={nodeRef} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  )

  return ReactDOM.createPortal(content, htmlElement)
}

export default SideDrawer
