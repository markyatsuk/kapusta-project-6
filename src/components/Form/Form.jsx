import s from './Form.module.css';
import { useState } from 'react';
import { GoogleIconHome } from '../../components/Icons/Icons';
export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange({ target: { name, value } }) {
    switch (name) {
      case 'email':
        return setEmail(value.trim());
      case 'password':
        return setPassword(value.trim());
      default:
        return;
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('email', email);
    console.log('password', password);
    setEmail('');
    setPassword('');
    e.target.reset();
  }

  const isDisabled = () => {
    if (email === '' || password === '') return true;
  };

  // function togglePassword(e){

  // }
  return (
    <div className={s.formContainer}>
      <p className={s.help}>You can log in with your Google Account:</p>
      <button className={s.googleBtn}>
        {' '}
        <GoogleIconHome /> <span className={s.btn__span}>Google</span>
      </button>
      <p className={s.help}>
        Or log in using e-mail and password, after registering:
      </p>
      <form action="" onSubmit={handleFormSubmit} className={s.form}>
        <p className={s.prompt}>Email:</p>
        <input
          className={s.form__input + ' ' + s.form__inputMargin}
          type="email"
          name="email"
          title=""
          required
          onChange={handleChange}
          placeholder="your@email.com"
          autoComplete="on"
        />
        <p className={s.prompt}>Password:</p>
        <input
          className={s.form__input + ' ' + s.password}
          type="password"
          name="password"
          title=""
          required
          placeholder="password"
          autoComplete="current-password"
          id="current-password"
          onChange={handleChange}
        />
        {/* <a href="!" className={s.passwordControl} onClick={togglePassword}></a> */}
        <div className={s.buttonContainer}>
          <button
            className={s.authBtn + ' ' + s.activeBtn}
            disabled={isDisabled()}
          >
            Login
          </button>
          <button className={s.authBtn} disabled={isDisabled()}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}