import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import './ChartVariable.scss';

const ChartVariable = ({
  name = '',
  labelY = '',
  labelX = '',
  x = 0,
  y = 0,
}: {
  name: string;
  labelY?: string;
  labelX?: string;
  x: number;
  y: number;
}) => {
  const options = useRef<any>({
    responsive: true,
    type: 'line',
    maintainAspectRatio: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      // y: {
      //   suggestedMin:-15,
      //   suggestedMax: 15,
      // },
    },
  });

  const data = useRef<any>({
    labels: [],
    datasets: [
      {
        label: 'Inclination',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });
  const charRer = useRef<any>();

  useEffect(() => {}, []);

  useEffect(() => {
    if (!charRer.current) return;
    if (data.current.labels.length > 50) {
      data.current.labels.shift();
      data.current.datasets[0].data.shift();
    }
    data.current.labels.push('');
    data.current.datasets[0].data.push(y);

    charRer.current.update();
  }, [charRer, x, y]);

  return (
    <div className='ChartVariable'>
      <Line ref={charRer} options={options.current} data={data.current} />;
    </div>
  );
};

export default ChartVariable;
