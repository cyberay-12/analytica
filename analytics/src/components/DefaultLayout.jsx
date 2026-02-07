import {Link, Navigate, Outlet} from 'react-router-dom';
import {useStateContext} from '../contexts/ContextProvider.jsx';
import logo from '../assets/images/analytica logo.png';
import {useEffect, useState} from 'react';
import axiosClient from '../axios-client.js';

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (e) => {
    e.preventDefault()

    axiosClient.post('/logout')
    .then(() => {
      setUser({});
      setToken(null);
    })
  }

  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data);
    })
  }, []);

  const [toggleRadiis, setToggleRadiis] = useState(false);

  return (
    <div id="defaultLayout">
      <aside> 
        <img src={logo} alt="Analytica Logo" className="logo" />
        <button onClick={() => setToggleRadiis(!toggleRadiis)} className="dropdown">
          RADIIS
        </button>
        {toggleRadiis && (
        <div className="submenu">
          <Link className="indropdown" to="/rdsprogram">RADIIS Programs</Link>
          <Link className="indropdown" to="/rdsproject">RADIIS Projects</Link>
        </div>
        )}
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div> 
            Hey there!
          </div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout}className="btn-logout">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}