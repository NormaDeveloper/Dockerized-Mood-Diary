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

import { db } from '../services/firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, getDocs  } from 'firebase/firestore';


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

  

// **************************************************//
//**** If using my DB ******//
// **************************************************//
  // const handleAddNewEntry = (entry) => {
  //   saveEntry(entry);
  //   api.sendEntryToApi(entry);
  // };


  
// **************************************************//
//**** If using Firestore ******//
// **************************************************//

//Hooks
const getEntriesFromFirestore =   () => {
  const entriesCollection = collection(db, 'entries');
  onSnapshot(entriesCollection, (snapshot)=> {
    const docs = [];
    snapshot.forEach((doc) => {
      docs.push({...doc.data(), id: doc.id});
    });
    setEntries(docs)
    
    console.log(docs);
  });
}

  useEffect(() => {
  console.log('carga');
  getEntriesFromFirestore()
  
  }, []);



  const handleAddNewEntry = async (entry) => {
    saveEntry(entry);
    await addDoc(collection(db, 'entries'), entry); //Firestore DB
  };

// The delete functionality Currently works just for Firestore. Necessary to be done for my DB @@
  const handleDeleteEntry = async (id) => {
     // Ask the user if he wants to delete the entry
    if(window.confirm("Are you sure you want to delete this post?")){
     await deleteDoc(doc(db, 'entries', id));
    }
  };


  const handleEditEntry = (id, newDescription, newMood) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, description: newDescription, mood: newMood } : entry
      )
    );
  };
  


  const submitUpdatedEntry = async (editedEntry) => {
    try {
      // Update entry in Firestore
      await updateDoc(doc(db, 'entries', editedEntry.id), editedEntry);
  
      // Get updated entries from Firestore
      const querySnapshot = await getDocs(collection(db, 'entries'));
      const updatedEntries = querySnapshot.docs.map((doc) => doc.data());
      setEntries(updatedEntries);
    } catch (error) {
      console.error('Error actualizando la entrada:', error);
    }
  };
  

  // **************************************************//
  // **************************************************//

    

  // const submitUpdatedEntry = (editedEntry) => {
  //   api.sendEditedEntryToApi(editedEntry);
  //   api.getEntriesFromApi().then((response) => {
  //     setEntries(response);
  //   });
   
  // };


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
        handleDeleteEntry={handleDeleteEntry}
      />
    </div>
  );
}

export default App;
