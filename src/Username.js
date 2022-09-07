import { useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const Username = ({ userName, setUserName, validName, setValidName, userNameFocus, setUserNameFocus }) => {

  const uniqueUserName = () => {
    
  }

  useEffect(() => {
    setValidName(USER_REGEX.test(userName));
  }, [userName])

  return(
    <>
      <label htmlFor="username">
        Username:
        <span className={validName ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validName || !userName ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
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
    </>
  );
}

export default Username;