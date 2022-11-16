import { useState, useContext } from "react";

import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../context/user.context";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInFrom = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password} = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  
  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);

      setCurrentUser(user);

    } catch(error) {
      console.log(error);
    }

  }

  const handleChange = (event) => {
      const {name, value} = event.target;

      setFormFields({ ...formFields, [name]: value});
  }; 

  return(
    <div className="sign-in-container">
      <h2>Already have an account!</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
        
              
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

        
        <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}/>

        <div className="buttons-container">
          <Button buttonType='' type='submit'>Sign In</Button>
          <Button type="button" buttonType='google' onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>  

      </form>
    </div>
  )
}

export default SignInFrom;