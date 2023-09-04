import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'Famous building',
    imageUrl:
      'https://www.civitatis.com/f/estados-unidos/nueva-york/big/entrada-empire-state.jpg',
    address: '20 W 34th St., New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Emp...',
    description: 'Famous building',
    imageUrl:
      'https://www.civitatis.com/f/estados-unidos/nueva-york/big/entrada-empire-state.jpg',
    address: '20 W 34th St., New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u2',
  },
]

const UserPlaces = () => {
  const userId = useParams().userId
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId)

  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
