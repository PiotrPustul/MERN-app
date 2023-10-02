import { useState, useEffect } from 'react'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import UsersList from '../components/UsersList'

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        )

        setLoadedUsers(responseData.users)
      } catch (err) {}
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  )
}

export default Users
