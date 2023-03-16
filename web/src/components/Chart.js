import { useMemo } from 'react';
//useMemo: store everything as entity. If there is a rerender, the entire graph should not be rendered if the data has not changed
import '../styles/Chart.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

//import component of the library that allows me to display bar chart
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ angryPercentage, sadPercentage, happyPercentage }) {
  const scores = [angryPercentage, sadPercentage, happyPercentage];

  const labels = ['Angry', 'Sad', 'Happy'];

  const options = {
    responsive: false,
    scales: {
      x: {
        ticks: {
          callback: function (values) {
            return this.getLabelForValue(values) + '%';
          },
        },
      },
    },

    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'My Mood Statistic',
        color: 'black',
      },
    },
  };

  //memorize the data that I am going to pass to my graph
  //reactChart asks us to pass an object that contains the DATASET key, which are the data sets that I want to be painted on my chart

  const data = useMemo(function () {
    return {
      //Datasets -> axis Y
      datasets: [
        {
          data: scores,
          backgroundColor: 'rgb(179,213,244)',
          borderRadius: 10,
        },
      ],

      labels, //-> axis X
    };
  }, []);

  return <Bar data={data} options={options} />;
}

export default Chart;
