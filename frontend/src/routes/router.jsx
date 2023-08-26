import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

// pages
import Users from '../user/pages/Users'
import NewPlace from '../places/pages/NewPlace'
import NotFoundPage from './NotFoundPage'

// layouts
import RootLayout from '../layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Users />} />
      <Route path='places'>
        <Route path='new' element={<NewPlace />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
)

export default router
