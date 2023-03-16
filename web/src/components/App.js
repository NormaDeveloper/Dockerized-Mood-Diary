import '../styles/App.scss';
import '../styles/Chart.scss';
import { useState, useEffect } from 'react';
import api from '../services/api';
import EntryInput from './EntryInput';
import EntryList from './EntryList';
import Chart from './Chart';
import chartOperations from '../services/chartOperations';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdOutlineBarChart } from 'react-icons/md';

function App() {
  //State Variables
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('');
  const [open, setOpen] = useState(false);
  const [toggleHiddenError, setToggleHiddenError] = useState(false);

  //Hooks
  useEffect(() => {
    api.getEntriesFromApi().then((dataFromApi) => {
      setEntries(dataFromApi);
    });
  }, []);

  //Events functions
  const updateDescription = (inputValue) => {
    setDescription(inputValue);
  };

  const updateMood = (inputValue) => {
    setMood(inputValue);
  };

  const saveEntry = (entry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
  };

  const handleAddNewEntry = (entry) => {
    saveEntry(entry);
    api.sendEntryToApi(entry);
  };

  const submitUpdatedEntry = (editedEntry) => {
    api.sendEditedEntryToApi(editedEntry);
    api.getEntriesFromApi().then((response) => {
      setEntries(response);
    });
  };

  const handleHiddenError = () => {
    setToggleHiddenError(!toggleHiddenError);
  };

  //Modal Window
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const totalEntries = chartOperations.getTotal(entries);
  const totalHappy = chartOperations.getEachMoodTotal(entries, 'happy');
  const totalSad = chartOperations.getEachMoodTotal(entries, 'sad');
  const totalAngry = chartOperations.getEachMoodTotal(entries, 'angry');

  const sadPercentage = chartOperations.getPercentage(totalSad, totalEntries);
  const happyPercentage = chartOperations.getPercentage(
    totalHappy,
    totalEntries
  );
  const angryPercentage = chartOperations.getPercentage(
    totalAngry,
    totalEntries
  );

  return (
    <div>
      <div className="chart__container">
        <MdOutlineBarChart className="chart__btn" onClick={handleOpen} />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="chart__box">
          <Chart
            open={open}
            sadPercentage={sadPercentage}
            happyPercentage={happyPercentage}
            angryPercentage={angryPercentage}
          />
        </Box>
      </Modal>
      <EntryInput
        addNewEntry={handleAddNewEntry}
        description={description}
        mood={mood}
        updateDescription={updateDescription}
        updateMood={updateMood}
        toggleHiddenError={toggleHiddenError}
        handleHiddenError={handleHiddenError}
      />
      <EntryList
        listOfEntries={entries}
        submitUpdatedEntry={submitUpdatedEntry}
        description={description}
        mood={mood}
        updateMood={updateMood}
      />
    </div>
  );
}

export default App;
