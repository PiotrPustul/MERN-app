import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

// pages
import Users from '../user/pages/Users'
import NotFoundPage from './NotFoundPage'
import NewPlace from '../places/pages/NewPlace'
import UserPlaces from '../places/pages/UserPlaces'
import UpdatePlace, { updatePlaceLoader } from '../places/pages/UpdatePlace'

// layouts
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Users />} />
      <Route path=':userId/places' element={<UserPlaces />} />
      <Route
        path=':userId/places/:placeId'
        element={<UpdatePlace />}
        loader={updatePlaceLoader}
      />
      <Route path='places/new' element={<NewPlace />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
)

export default router
