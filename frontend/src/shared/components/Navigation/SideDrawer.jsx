import ReactDOM from 'react-dom'
import './SideDrawer.css'

const SideDrawer = (props) => {
  const content = <aside className='side-drawer'>{props.children}</aside>
  const htmlElement = document.getElementById('drawer-hook')

  return ReactDOM.createPortal(content, htmlElement)
}

export default SideDrawer
