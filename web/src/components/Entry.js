import '../styles/Entry.scss';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineSend } from 'react-icons/ai';

const Entry = ({ mood, id, description, date, submitUpdatedEntry }) => {
  const [editable, setEditable] = useState(true);
  const [newDescription, setNewDescription] = useState(description);
  const [newMood, setNewMood] = useState(mood);

  const handleMoodBtns = (e) => {
    setNewMood(e.target.value);
  };
  const handleDescription = (e) => {
    setNewDescription(e.target.value);
  };

  const handleOnSubmit = (e) => {
    setEditable(!editable);
    e.preventDefault();
    if (description && description.trim().length > 0) {
      submitUpdatedEntry({
        description: newDescription,
        mood: newMood,
        id: id,
      });
    }
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

  return (
    <form className="form">
      <div className="user">
        <div>
          <h3 className="user__title">erlich bachman</h3>
          <p className="user__date">{date}</p>
        </div>

        {editable ? (
          <FiEdit2 className="user__edit-icon" onClick={handleEdit} />
        ) : null}

        {!editable ? (
          <AiOutlineSend
            className="user__submit-icon"
            onClick={handleOnSubmit}
          />
        ) : null}
      </div>

      <div className="description">
        <label className="description__label" htmlFor="description">
          description
        </label>

        {editable ? (
          <p className="description__displayText">{description}</p>
        ) : (
          <textarea
            className={'description__textarea'}
            id="description"
            value={newDescription}
            onChange={handleDescription}
            type="text"
            maxLength={100}
          />
        )}
      </div>

      <div className="mood-container">
        <p className="mood__title">mood</p>
        {editable ? (
          <input
            className={
              mood === 'happy' ? 'customButton active' : 'customButton'
            }
            type="button"
            name="mood"
            value="happy"
            onClick={handleMoodBtns}
            disabled={editable}
          />
        ) : (
          <input
            className={
              newMood === 'happy' ? 'customButton active' : 'customButton'
            }
            type="button"
            name="mood"
            value="happy"
            onClick={handleMoodBtns}
            disabled={editable}
          />
        )}

        {editable ? (
          <input
            className={mood === 'sad' ? 'customButton active' : 'customButton'}
            type="button"
            name="mood"
            value="sad"
            onClick={handleMoodBtns}
            disabled={editable}
          />
        ) : (
          <input
            className={
              newMood === 'sad' ? 'customButton active' : 'customButton'
            }
            type="button"
            name="mood"
            value="sad"
            onClick={handleMoodBtns}
            disabled={editable}
          />
        )}

        {editable ? (
          <input
            className={
              mood === 'angry' ? 'customButton active' : 'customButton'
            }
            type="button"
            name="mood"
            value="angry"
            onClick={handleMoodBtns}
            disabled={editable}
          />
        ) : (
          <input
            className={
              newMood === 'angry' ? 'customButton active' : 'customButton'
            }
            type="button"
            name="mood"
            value="angry"
            onClick={handleMoodBtns}
            disabled={editable}
          />
        )}
      </div>
    </form>
  );
};

export default Entry;
