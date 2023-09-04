import Input from '../../shared/components/FormElements/Input'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import './Auth.css'

const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const authSubmitHandler = (event) => {
    event.preventDefault()

    console.log(formState.inputs)
  }

  return (
    <Card className='authentication'>
      <form onSubmit={authSubmitHandler}>
        <h2>Login Required</h2>
        <hr />
        <Input
          id='email'
          element='input'
          type='email'
          label='E-Mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address.'
          onInput={inputHandler}
        />
        <Input
          id='password'
          element='input'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid password, at least 5 chars.'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Login
        </Button>
      </form>
    </Card>
  )
}

export default Auth
