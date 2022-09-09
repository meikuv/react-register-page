import { useState, useEffect, useRef } from 'react';
import { faCheck, faTimes, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './api/axios';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  const [isUnique, setIsUnique] = useState(true);

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

    const getUserInfo = async () => {
      try {
        const result = await axios.get(REGISTER_URL)
          .then((response) => setUser(response.data))
      } catch (error) {
        setErrMsg(error);
      }
    }

    getUserInfo();
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    const result = USER_REGEX.test(userName);
    setIsLoading(true);
    if (result) {
      setValidName(result);
      setIsUnique(user.filter(user => user.userName === userName)[0]?.userName)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    } else {
      setValidName(false);
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }, [user, userName])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [email, userName, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = EMAIL_REGEX.test(email);
    const userValid = USER_REGEX.test(userName);
    const pwdValid = PWD_REGEX.test(pwd);
    if (!userValid || !pwdValid || !emailValid) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL, JSON.stringify({email, userName, pwd}),
        {
          headers: {'Content-type' : 'application/json'},
          withCredentials: true
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No server response');
      } else if (error.response?.status === 409) {
        setErrMsg('Username taken');
      } else {
        setErrMsg('Registration failed');
      }
      errRef.current.focus();
    }
  }

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
          <form onSubmit={handleSubmit}>
          {/* EMAIL */}
            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="emailnote" className={emailFocus && email && 
            !validEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Invalid email address.
            </p>
              
            {/* USERNAME */}
            <label htmlFor="username">
              Username:
              <>
                {validName ? (
                  <>
                    {isLoading ? (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} className="spinner" />
                      </span>
                    ) : (
                      <>
                        { isUnique ? (
                          <FontAwesomeIcon icon={faTimes} className="invalid" />
                        ) : (
                          <FontAwesomeIcon icon={faCheck} className="valid" />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <span className={!userName ? "hide" : "invalid"}>
                      asd
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                )}
              </>
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserNameFocus(true)}
              onBlur={() => setUserNameFocus(false)}
            />
            <p id="uidnote" className={userNameFocus && userName && 
            !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* PASSWORD */}
            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and special
              character. <br />
              Allowed special characters: <span aria-label="exclamation mark">! </span>  
              <span aria-label="at symbol">@ </span><span aria-label="hashtag"># </span>
              <span aria-label="dollar sign">$ </span><span aria-label="percent">%</span>
            </p>

            {/* Confirmation Password */}
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd  ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"} >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <button disabled={!validEmail || !validPwd || !validName || !validMatch || isUnique || isLoading ? true : false}>Sign Up</button>
          </form>
        </section>
      )}
    </>
  );
}

export default Register;
