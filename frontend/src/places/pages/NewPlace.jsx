import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useForm } from '../../shared/hooks/form-hook'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import './PlaceForm.css'

const NewPlace = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const placeSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      await sendRequest(
        'http://localhost:8000/api/places/',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: authCtx.userId,
        }),
        {
          'Content-Type': 'application/json',
        }
      )
      navigate('/')
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid Title.'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          type='text'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid Description (at least 5 characters).'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          type='text'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid Address.'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  )
}

export default NewPlace
