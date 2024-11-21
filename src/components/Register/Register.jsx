import PropTypes from "prop-types";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

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

  const validEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email.trim());
  }

  const onSubmitRegister = async (e) => {
    e.preventDefault()
    
    if(!validEmail()) return fireAlert("Oops...", "error", "Invalid email format!")
    if(!email.trim() || !password.trim() || !name.trim()) return fireAlert("Oops...", "error", "Complete all required fields!")
    
    try {
      const res = await axios({
        method: 'post',
        url:`${import.meta.env.VITE_DATABASE_URL}/register`, 
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          email,
          password,
          name
        }
      })

      loadUser(res.data)
      onRouteChange("home")
      fireAlert("Your registration was successful!", "success")
    } catch (error) {
      fireAlert("Did not register!", "error")
    }
  };
  
  const fireAlert = (title, icon, text = null) => {
    Swal.fire({
      title,
      icon,
      text
    });
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
