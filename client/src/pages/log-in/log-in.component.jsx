import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

import Input from './../../components/Form/form-input.component';
import API from './../../utils/API';

import './log-in.styles.scss';

const LogIn = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [interest, setInterest] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = event => {
    switch(event.target.name) {
      case('email'): return setEmail(event.target.value);
      case('password'): return setPassword(event.target.value);
      case('confirmPassword'): return setConfirmPassword(event.target.value);
      case('firstName'): return setFirstName(event.target.value);
      case('lastName'): return setLastName(event.target.value);
      case('city'): return setCity(event.target.value);
      case('zipCode'): return setZipCode(event.target.value);
      case('interest'): return setInterest(event.target.value);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if(event.target.name === "sign-up")
      API.signUp({email, password, confirmPassword, firstName, lastName, city, zipCode, interest})
        .then(() => alert("Successfully login"))
        .catch(err => alert(err.response.data.message));

    if(event.target.name === "sign-in")
      API.signIn(email, password)
        .then(response => localStorage.setItem('user', JSON.stringify(response.data.data)))
        .then(() => {
          setTimeout(() => setRedirect(true), 2000)
        })
        .catch(err => alert(err.response.data.message));
  }

  const renderRedirect = () => {
    if (redirect) {
      if(props.match.url === '/')
        return window.location.reload();
      return <Redirect to='/' />
    }
  }

  const action = props.match.params.action;
  console.log(props.match);
  return (
    <div className="log-in-container">
      {renderRedirect()}
      <h1>{action === "signup" ? "Sign Up" : "Sign In"}</h1>
      <form>
        <Input 
          className="email-input form-input form-inherit"
          onChange = {handleInputChange}
          name="email"
          type="text"
          placeholder="Username"
          required
        />
        <Input 
          className="password-input form-input form-inherit"
          onChange = {handleInputChange}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {
          action === 'signup' ? 
          (
          <>
          <Input 
            onChange = {handleInputChange}
            className="confirm-password-input form-input form-inherit"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <Input 
            onChange = {handleInputChange}
            className="confirm-password-input form-input form-inherit"
            name="firstName"
            type="text"
            placeholder="First Name"
            required
          />
          <Input 
            onChange = {handleInputChange}
            className="confirm-password-input form-input form-inherit"
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
          />
          <Input 
            onChange = {handleInputChange}
            className="confirm-password-input form-input form-inherit"
            name="city"
            type="text"
            placeholder="City"
            required
          />
          <Input 
            onChange = {handleInputChange}
            className="confirm-password-input form-input form-inherit"
            name="zipCode"
            type="text"
            placeholder="Zip Code"
            required
          />
          <Input 
            onClick={handleFormSubmit}
            className="form-btn form-inherit"
            name="sign-up"
            type="submit"
            value="Sign up"
          />
          or <a href="/login/signin">Log in</a>
          </>)
          :
          <>
          <Input 
            onClick={handleFormSubmit}
            className="form-btn form-inherit"
            name="sign-in"
            type="submit"
            value="Sign in"
          />
          or <a href="/login/signup">Create new account</a>
          </>
        }
      </form>
    </div>
  );
}

export default LogIn;