import {Link} from 'react-router-dom';

export default function LogIn() {

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit} className="login-form">
          <h1 className="title">Log In</h1>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password" />
          <button type="submit" className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}