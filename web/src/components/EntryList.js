import moment from 'moment';
import Entry from './Entry';

function EntryList({ listOfEntries, submitUpdatedEntry, updateDescription }) {
  const htmlListOfEntries =
    listOfEntries &&
    listOfEntries.map((entry, i) => {
      const entryDate = moment(entry.createdAt).fromNow();
      return (
        <li key={i} className="entry-item">
          <Entry
            submitUpdatedEntry={submitUpdatedEntry}
            mood={entry.mood}
            id={entry.id}
            description={entry.description}
            date={entryDate}
            listOfEntries={listOfEntries}
            updateDescription={updateDescription}
          />
        </li>
      );
    });

  return <ul className="entries_list">{htmlListOfEntries}</ul>;
}

export default EntryList;
