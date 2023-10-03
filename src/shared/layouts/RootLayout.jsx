import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/Navigation/MainNavigation'

const RootLayout = () => {
  return (
    <div className='root-layout'>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
