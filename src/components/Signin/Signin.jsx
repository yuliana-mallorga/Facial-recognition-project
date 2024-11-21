import PropTypes from "prop-types";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

function Signin({ onRouteChange, loadUser }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  const onEmailChange = (event)=> {
    return setSignInEmail(event.target.value)
  }
  
  const onPasswordChange = (event) => {
    return setSignInPassword(event.target.value)
  }


  const onSubmitSignIn = async (e) => {
    e.preventDefault()
    
    try {
      const r = await axios({
        method: 'post',
        url:`${import.meta.env.VITE_DATABASE_URL}/signin`, 
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          email: signInEmail,
          password: signInPassword
        }
      })
     
      const user = r.data
      
      if(user.id){
        loadUser(user)
        onRouteChange("home")
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
      });
    }
  }
  
  return (
    <article className="br3 pa4 ba dark-gray b--black-10 mv5 w-100 w-50-m mw7 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange = {onEmailChange}
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
                onChange = {onPasswordChange}
              />
            </div>
          </fieldset>
          <div>
            <div className="flex justify-center">
              <input
                onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3 flex justify-center">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </form>
      </main>
    </article>
  );
}

Signin.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};
export default Signin;
