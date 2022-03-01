import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import './ChartVariable.scss';

const ChartVariable = ({
  name = '',
  labelY = '',
  labelX = '',
  color = '',
  x = 0,
  y = 0,
}: {
  name: string;
  labelY?: string;
  labelX?: string;
  color?: string;
  x: number;
  y: number;
}) => {
  const options = useRef<any>({
    responsive: true,
    maintainAspectRatio: true,
    type: 'line',
    animation: {
      duration: 350,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {},
    scales: {},
  });

  const data = useRef<any>({
    labels: [],
    datasets: [
      {
        label: name,
        data: [],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1.5,
        fill: true,
        cubicInterpolationMode: 'monotone',
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
    data.current.labels.push(labelX);
    data.current.datasets[0].data.push(y);

    charRer.current.update();
  }, [charRer, x, y]);

  return (
    <div className='ChartVariable'>
      <Line ref={charRer} options={options.current} data={data.current} />
    </div>
  );
};

export default ChartVariable;
