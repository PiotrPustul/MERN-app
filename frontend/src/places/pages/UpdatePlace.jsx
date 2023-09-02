import { useLoaderData } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import './PlaceForm.css'

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
  const identifiedPlace = useLoaderData()

  const [formState, inputHandler] = useForm(
    {
      title: { value: identifiedPlace.title, isValid: true },
      description: { value: identifiedPlace.description, isValid: true },
    },
    true
  )

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  return (
    <div>
      {identifiedPlace ? (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (At least 5 charackters).'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type='submit' disabled={!formState.isValid}>
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
