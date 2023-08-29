import { Outlet } from 'react-router-dom'
import MainNavigation from '../../shared/components/Navigation/MainNavigation'

const RootLayout = () => {
  return (
    <div className='root-layout'>
      <MainNavigation />
      {/* <header className='main-header'>
        <button className='main-navigation'></button>
        <nav>
          <NavLink to='/'>Users</NavLink>
          <NavLink to='places/new'>New Place</NavLink>
        </nav>
      </header> */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
