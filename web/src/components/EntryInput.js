import '../styles/EntryInput.scss';
import { AiOutlineSend } from 'react-icons/ai';
import ErrorMessage from './ErrorMessage';

const EntryInput = ({
  addNewEntry,
  description,
  mood,
  updateMood,
  updateDescription,
  handleHiddenError,
  toggleHiddenError,
}) => {
  const handleMoodBtns = (e) => {
    updateMood(e.target.value);
  };
  const handleTextarea = (e) => {
    updateDescription(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (description && description.trim().length > 0) {
      addNewEntry({
        description,
        mood,
        date: Date.now(),
      });

      updateDescription('');
      updateMood('');
    } else {
      handleHiddenError();
    }
  };

  return (
    <form className="form">
      <h3 className="user__title">erlich bachman</h3>
      <p className="user__date">Today</p>
      <div className="description">
        <label className="description__label" htmlFor="description">
          description
        </label>
        <textarea
          className="description__textarea"
          id="description"
          value={description}
          onChange={handleTextarea}
          type="text"
          maxLength={100}
        />
      </div>
      <ErrorMessage
        toggleHiddenError={toggleHiddenError}
        description={description}
        mood={mood}
      />

      <div className="moods">
        <input
          className={mood === 'happy' ? 'customButton active' : 'customButton'}
          type="button"
          name="mood"
          value="happy"
          onClick={handleMoodBtns}
        />

        <input
          className={mood === 'sad' ? 'customButton active' : 'customButton'}
          type="button"
          name="mood"
          value="sad"
          onClick={handleMoodBtns}
        />

        <input
          className={mood === 'angry' ? 'customButton active' : 'customButton'}
          type="button"
          name="mood"
          value="angry"
          onClick={handleMoodBtns}
        />
      </div>
      <ErrorMessage
        toggleHiddenError={toggleHiddenError}
        description={description}
        mood={mood}
      />
      <div className="submit-container">
        <AiOutlineSend className="user__submit-icon" onClick={handleOnSubmit} />
      </div>
    </form>
  );
};

export default EntryInput;
