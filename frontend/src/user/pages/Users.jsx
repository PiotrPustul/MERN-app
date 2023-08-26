import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Piotr',
      image: 'https://picsum.photos/id/237/536/354',
      places: 3,
    },
  ]

  return <UsersList items={USERS} />
}

export default Users
