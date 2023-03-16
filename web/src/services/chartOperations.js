const getTotal = (entries) => {
  return entries.length;
};

const getEachMoodTotal = (entries, str) => {
  const totalEntries = entries.filter((entry) => entry.mood === str);
  return totalEntries.length;
};

const getPercentage = (mood, total) => {
  return ((mood / total) * 100).toFixed(0);
};

const objToExport = {
  getTotal: getTotal,
  getEachMoodTotal: getEachMoodTotal,
  getPercentage: getPercentage,
};

export default objToExport;
