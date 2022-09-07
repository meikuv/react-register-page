import { useState, useEffect, useRef } from 'react';
import Email from './Email';
import Username from './Username';
import Password from './Password';
import ConfirmPassword from './ConfirmPassword';
import axios from './api/axios';

const REGISTER_URL = '/registe';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [userName, setUserName] = useState('');
  const [validName, setValidName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, userName, pwd, matchPwd])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userValid = USER_REGEX.test(user);
  //   const pwdValid = PWD_REGEX.test(pwd);
  //   if (!userValid || !pwdValid) {
  //     setErrMsg('Invalid Entry');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       REGISTER_URL, JSON.stringify({email, user, pwd}),
  //       {
  //         headers: {'Content-type' : 'application/json'},
  //         withCredentials: true
  //       }
  //     );
  //     console.log(response.data);
  //     console.log(response.accessToken);
  //     console.log(JSON.stringify(response));
  //     setSuccess(true);
  //   } catch (error) {
  //     if (!error?.response) {
  //       setErrMsg('No server response');
  //     } else if (error.response?.status === 409) {
  //       setErrMsg('Username taken');
  //     } else {
  //       setErrMsg('Registration failed');
  //     }
  //     errRef.current.focus();
  //   }
  // }



  return (
      <>
      {success ? (
        <section>
          <p style={{color: "red"}}>Success</p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Register</h1>
          <form>
          {/* onSubmit={handleSubmit} */}
            {/* EMAIL */}
            <Email 
              email={email}
              userRef={userRef}
              setEmail={setEmail}
              validEmail={validEmail}
              setValidEmail={setValidEmail}
              emailFocus={emailFocus}
              setEmailFocus={setEmailFocus}
            />
            
            {/* USERNAME */}
            <Username 
              userName={userName}
              setUserName={setUserName}
              validName={validName}
              setValidName={setValidName}
              userNameFocus={userNameFocus}
              setUserNameFocus={setUserNameFocus}
            />

            {/* PASSWORD */}
            <Password 
              pwd={pwd}
              setPwd={setPwd}
              validPwd={validPwd}
              setValidPwd={setValidPwd}
              pwdFocus={pwdFocus}
              setPwdFocus={setPwdFocus}
              matchPwd={matchPwd}
              setValidMatch={setValidMatch}
            />

            {/* Confirmation Password */}
            <ConfirmPassword 
              matchPwd={matchPwd}
              setMatchPwd={setMatchPwd}
              validMatch={validMatch}
              setValidMatch={setValidMatch}
              matchFocus={matchFocus}
              setMatchFocus={setMatchFocus}
            />

            <button disabled={!validEmail || !validPwd || !validName || !validMatch ? true : false}>Sign Up</button>
          </form>
        </section>
      )}
      </>
  );
}

export default Register;