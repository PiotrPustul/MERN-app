import { useState, useCallback } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'

// pages
import Users from './user/pages/Users'
import NotFoundPage from './places/pages/NotFoundPage'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace, { updatePlaceLoader } from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'

// layouts
import RootLayout from './shared/layouts/RootLayout'
import { AuthContext } from './shared/context/auth-context'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])
  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Users />} />
        <Route path=':userId/places' element={<UserPlaces />} />
        <Route
          path=':userId/places/:placeId'
          element={
            isLoggedIn ? <UpdatePlace /> : <Navigate replace to='/auth' />
          }
          loader={updatePlaceLoader}
        />
        <Route
          path=':userID/places/new'
          element={isLoggedIn ? <NewPlace /> : <Navigate replace to='/auth' />}
        />
        <Route
          path='auth'
          element={!isLoggedIn ? <Auth /> : <Navigate to='/' />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
