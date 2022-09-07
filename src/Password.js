import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Password = ({ pwd, setPwd, validPwd, setValidPwd, pwdFocus, setPwdFocus, matchPwd, setValidMatch }) => {

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  return(
    <>
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
    </>
  )
}

export default Password;