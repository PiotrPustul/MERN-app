import { Outlet } from 'react-router-dom'
import MainNavigation from '../../shared/components/Navigation/MainNavigation'

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
