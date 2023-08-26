import { NavLink, Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='root-layout'>
      <header>
        <nav>
          <NavLink to='/'>Users</NavLink>
          <NavLink to='places/new'>New Place</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
