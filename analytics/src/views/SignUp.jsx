import {Link} from 'react-router-dom';
import {useRef} from 'react';   
import axiosClient from '../axios-client.js'; 
import {useStateContext} from '../contexts/ContextProvider'; 

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {setUser, setToken} = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const payload ={
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    }
    
    console.log(payload);
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit} className="login-form">
          <h1 className="title">Sign Up</h1>
          <input ref={nameRef} type="text" placeholder="full name"/>
          <input ref={emailRef} type="email" placeholder="email"/>
          <input ref={passwordRef} type="password" placeholder="password" />
          <input ref={passwordConfirmRef} type="password" placeholder="confirm password" />
          <button type="submit" className="btn btn-block">Sign Up</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  );
}