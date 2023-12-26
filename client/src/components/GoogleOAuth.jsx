import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { auth } from '../config/firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function GoogleOAuth() {
  const googleProvider = new GoogleAuthProvider()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })
      const data = await res.json()
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      console.log('could not sign in with google', error)
    }
  }
  return (
    <button
      onClick={signInWithGoogle}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  )
}
