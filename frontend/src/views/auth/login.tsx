import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from 'redux/actions/authActions';
import { useAppDispatch } from 'redux/store/store';

const initialState = {
  email: '',
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlerSubmit = async (event: any) => {
    event.preventDefault();
    if (await dispatch(login(formData))) {
      navigate('/')
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-sm-5 mx-auto">
        <div className="card p-5 bg-primary">
          <h3 className="text-secondary">Login</h3>
          <form className="bg-primary" onSubmit={handlerSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control form-control-sm"
                id="email"
                aria-describedby="email"
                placeholder="Email"
              />
              {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control form-control-sm"
                id="password"
                placeholder="Password"
              />
            </div>
            <a href="/register" type="submit" className="btn btn-primary small btn-sm float-left">
              if don't have an account? Register
            </a>
            <button type="submit" className="btn btn-primary btn-sm float-right">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
