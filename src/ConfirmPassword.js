import { faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConfirmPassword = ({ matchPwd, setMatchPwd, validMatch, matchFocus, setMatchFocus}) => {
  return (
    <>
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
    </>
  );
}

export default ConfirmPassword;