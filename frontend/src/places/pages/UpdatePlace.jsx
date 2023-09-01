import { useLoaderData } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/components/util/validators'

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
    title: 'Empire State Building',
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

const UpdatePlace = () => {
  const place = useLoaderData()

  return (
    <div>
      {place ? (
        <form>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={() => {}}
            value={place.title}
            valid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (At least 5 charackters).'
            onInput={() => {}}
            value={place.description}
            valid={true}
          />
          <Button type='submit' disabled={true}>
            Update Place
          </Button>
        </form>
      ) : (
        <div className='center'>
          <h2>Could not find the place.</h2>
        </div>
      )}
    </div>
  )
}

export default UpdatePlace

// UpdatePlace Loader
export const updatePlaceLoader = async ({ params }) => {
  const { placeId } = params

  const identifiedPlace = await DUMMY_PLACES.find(
    (place) => place.id === placeId
  )

  if (!identifiedPlace) {
    return false
  }

  return identifiedPlace
}
