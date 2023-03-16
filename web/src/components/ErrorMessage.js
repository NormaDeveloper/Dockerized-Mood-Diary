import '../styles/ErrorMesssage.scss';

const ErrorMessage = ({ description, mood, toggleHiddenError }) => {
  if (description !== '' && mood !== '') {
    return toggleHiddenError === false;
  } else {
    return (
      <span
        className={`error-message ${toggleHiddenError ? null : 'hidden'}`}
        title="This field is required"
      >
        This field is required<br></br>
      </span>
    );
  }
};

export default ErrorMessage;
