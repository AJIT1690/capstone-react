import SignUpFrom from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return(
    <div>
      <h1>I am the sign in container</h1>
      <button onClick={logGoogleUser}>
        Sign in with google
      </button>
      <SignUpFrom />
    </div>
  )
}

export default SignIn;