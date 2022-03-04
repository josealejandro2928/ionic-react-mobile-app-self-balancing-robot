/* eslint-disable react-hooks/exhaustive-deps */
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
  yRangeAxis,
  xRangeAxis,
}: {
  name: string;
  labelY?: string;
  labelX?: string;
  color?: string;
  x: number;
  y: number;
  yRangeAxis?: Array<number>;
  xRangeAxis?: Array<number>;
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

  if (yRangeAxis) {
    options.current.scales.y = {
      suggestedMin: yRangeAxis[0],
      suggestedMax: yRangeAxis[1],
    };
  }

  if (xRangeAxis) {
    options.current.scales.x = {
      suggestedMin: xRangeAxis[0],
      suggestedMax: xRangeAxis[1],
    };
  }

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

  // useEffect(() => {
  //   console.log(options.current)
  // }, []);

  useEffect(() => {
    if (!charRer.current) return;
    if (data.current.labels.length > 40) {
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
