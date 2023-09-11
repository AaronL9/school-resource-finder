import { Link } from 'react-router-dom'
import '../assets/css/welcome.css'

export default function Welcome() {
  return (
    <div className="container">
      <div className='welcome'>
        <figure>
          <img src="/images/welcome.png" alt="welcome-logo"/>
          <figcaption>Let's Get Started</figcaption>
          <p>connect with each other you can now start reviewing!</p>
        </figure>
        <div className='controlls'>
          <Link to={'register'}>Sign Up</Link>
          <p>Already have an account ? <Link to={'login'}>Login</Link></p>
        </div>
      </div>
    </div>
  )
}
