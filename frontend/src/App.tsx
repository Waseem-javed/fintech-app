import React, { useEffect } from 'react';
import { Navbar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Login, NotFound, Register } from './views';
import { useSelector } from 'react-redux';
import { AuthSelector } from 'redux/reducers';
import { loadUser } from 'redux/actions/authActions';
import { store } from 'redux/store/store';

export const App = (): JSX.Element => {
  const AuthState = useSelector(AuthSelector);
  const { isAuthenticated, user } = AuthState;

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Navbar profile={{ isAuth: isAuthenticated, user: user }} />
      <div className="container">
        <BrowserRouter basename="/">
          <Routes>
            {isAuthenticated && user ? (
              <>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};
