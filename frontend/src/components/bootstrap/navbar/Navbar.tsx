import React from 'react';
import { INavbarProps } from './types';
import { logout } from 'redux/actions/authActions';
import { store } from 'redux/store/store';
import {redirect } from 'react-router-dom';

/**
 *
 * @param {INavbarProps} props - props
 * @return {React.FC} - returns
 */
const Navbar: React.FC<INavbarProps> = (props: INavbarProps) => {
  const { profile } = props;

  const logoutHandler = async (event: any) =>{
    event.preventDefault();
    await store.dispatch(logout());
    redirect('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-dark" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse me-auto" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
          {profile && profile.isAuth && profile.user && (
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
          )}
          </ul>
          <ul className="navbar-nav">
            {profile && profile.isAuth && profile.user ? (
              <>
                <li className="nav-item nav-link">
                 {profile.user.firstName}
                </li>
                <li className="nav-item">
                  <button onClick={logoutHandler} className="nav-link text-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
