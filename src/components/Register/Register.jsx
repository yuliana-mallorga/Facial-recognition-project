import PropTypes from "prop-types";
import { useState } from "react";
import axios from 'axios'

function Register({ onRouteChange, loadUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onNameChange = (event) => {
    return setName(event.target.value);
  };
  const onEmailChange = (event) => {
    return setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    return setPassword(event.target.value);
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault()
    
    try {
      const res= await axios({
        method: 'post',
        url:`${import.meta.env.VITE_DATABASE_URL}/register`, 
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          email: email,
          password: password,
          name: name,
        }
      })
        if(res.data){  
          loadUser(res.data)
          onRouteChange("home")
        }else{
          console.log('The user was not registered');
        }
      
    } catch (error) {
      console.log('Did not register');
    }
  }
  return (
    <article className="br3 pa4 ba dark-gray b--black-10 mv4 w-100 w-50-m mw7 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="register" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="flex justify-center">
            <input
              onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </main>
    </article>
  );
}

Register.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired
};
export default Register;
