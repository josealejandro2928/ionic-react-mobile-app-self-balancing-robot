const Chart = ({
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
  return (
    <div>
      <ul>
        <li>x: {x}</li>
        <li>y: {y}</li>
      </ul>
    </div>
  );
};

export default Chart;
