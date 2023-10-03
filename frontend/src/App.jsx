import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import RootLayout from './shared/layouts/RootLayout'
import NotFoundPage from './places/pages/NotFoundPage'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'

const Users = lazy(() => import('./user/pages/Users'))
const NewPlace = lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'))
const Auth = lazy(() => import('./user/pages/Auth'))

const App = () => {
  const { token, login, logout, userId } = useAuth()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Users />} />
        <Route path=':userId/places' element={<UserPlaces />} />
        <Route
          path=':userId/places/:placeId'
          element={token ? <UpdatePlace /> : <Navigate replace to='/auth' />}
        />
        <Route
          path='places/new'
          element={token ? <NewPlace /> : <Navigate replace to='/auth' />}
        />
        <Route path='auth' element={!token ? <Auth /> : <Navigate to='/' />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Suspense
        fallback={
          <div className='center'>
            <LoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthContext.Provider>
  )
}

export default App
