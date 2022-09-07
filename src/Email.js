import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const Email = ({ email, setEmail, validEmail, setValidEmail, emailFocus, setEmailFocus, userRef }) => {

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  return (
    <>
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
    </>
  );
}

export default Email;