/* eslint-disable react-hooks/exhaustive-deps */
import { useIonAlert } from '@ionic/react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import './Canvas2DRobot.scss';

const Canvas2DRobot = ({
  goToPoint = (x: number, y: number) => {},
  setPoint = [0, 0],
  start = false,
}: {
  goToPoint?: Function;
  start?: boolean;
  setPoint?: Array<number>;
}) => {
  const [presentAlert] = useIonAlert();
  const { posX, posY, robotOrien, angularVelocity } = useSelector(
    (state: RootState) => state.robot
  );
  const canvasRef = useRef<any>();
  let canvasHeight = 0;
  let canvasWidth = 0;
  let transX = 0;
  let transY = 0;
  const pxCm = 1.0;

  useEffect(() => {
    if (!canvasRef.current) return;
    draw();
  }, [canvasRef.current, setPoint, posX, posY, robotOrien]);

  async function getMousePos(canvas: any, evt: any) {
    var rect = canvas.getBoundingClientRect();
    let data = {
      x: evt.clientX - rect.left - transX,
      y: -1 * (evt.clientY - rect.top - transY),
    };

    if (start) {
      goToPoint(convertToMetters(data.x), convertToMetters(data.y));
      return;
    }

    await presentAlert({
      message: `Do you want to start a path to the point ( ${(data.x / 100).toFixed(1)} m, ${(
        data.y / 100
      ).toFixed(
        1
      )} m ). In order to be precise clear the state of the robot to track the real path`,
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: () => goToPoint(convertToMetters(data.x), convertToMetters(data.y)),
        },
      ],
    });
  }

  function convertToMetters(x: number) {
    return +(x / 100).toFixed(1);
  }

  function draw() {
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvasHeight = canvas.getClientRects()[0]?.height || 240;
    canvasWidth = canvas.getClientRects()[0]?.width || 360;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as any;
    transX = canvas.width * 0.5;
    transY = canvas.height * 0.5;

    //// Drawing the floor /////
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    grid();

    ////// Center the canvas coord. ///////////////////////////////
    ctx.translate(transX, transY);
    setpoint(setPoint[0], setPoint[1]);
    let rawData = processDataFromState(posX, posY, robotOrien, angularVelocity);
    robot(rawData.x, rawData.y, rawData.orient);
    ctx.translate(transX, transY);

    ///////////////////////Functions///////////////////////////////////
    function grid() {
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#bdbdbd';

      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.stroke();

      ctx.moveTo(0, canvasHeight / 2);
      ctx.lineTo(canvasWidth, canvasHeight / 2);
      ctx.stroke();
    }

    function robot(x: number = 0, y: number = 0, rotDegree: number = 0) {
      ctx.save();
      const height = 25 * pxCm;
      const width = 30 * pxCm;
      const centerRobotX = x - width / 2;
      const centerRobotY = -1 * y - height / 2;
      let wl = 6 * pxCm;
      let hl = 15 * pxCm;

      ctx.translate(x, -y);
      ctx.rotate((-1 * rotDegree * Math.PI) / 180);
      ctx.translate(-x, y);

      ctx.fillStyle = '#616161';
      ctx.fillRect(centerRobotX, centerRobotY, width, height);
      ctx.fillStyle = '#3949ab';
      ctx.fillRect(centerRobotX + 11 * pxCm, centerRobotY + 8 * pxCm, 8 * pxCm, 6 * pxCm);
      ctx.fillStyle = '#000000';
      ctx.fillRect(centerRobotX - wl, -1 * y - hl / 2, wl, hl);
      ctx.fillRect(centerRobotX + width, -1 * y - hl / 2, wl, hl);

      ctx.beginPath();
      ctx.arc(x + width / 2 - 5 * pxCm, -(y + height / 2 - 5 * pxCm), 1.5 * pxCm, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - width / 2 + 5 * pxCm, -(y + height / 2 - 5 * pxCm), 1.5 * pxCm, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x - width / 2 + 5 * pxCm, -(y - height / 2 + 5 * pxCm), 1.5 * pxCm, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + width / 2 - 5 * pxCm, -(y - height / 2 + 5 * pxCm), 1.5 * pxCm, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = '#4caf50';
      canvas_arrow(ctx, x, -(y + height / 2), x, -(y + 1.5*height));
      ctx.stroke();

      ctx.restore();
    }

    function setpoint(x: any, y: any) {
      ctx.save();
      if (x === undefined || y === undefined) return;
      x = Math.floor(x * 100);
      y = Math.floor(y * 100);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#2196f3';
      ctx.fill();
      ctx.restore();
    }

    function canvas_arrow(context: any, fromx: number, fromy: number, tox: number, toy: number) {
      var headlen = 10; // length of head in pixels
      var dx = tox - fromx;
      var dy = toy - fromy;
      var angle = Math.atan2(dy, dx);
      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
      context.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 6),
        toy - headlen * Math.sin(angle - Math.PI / 6)
      );
      context.moveTo(tox, toy);
      context.lineTo(
        tox - headlen * Math.cos(angle + Math.PI / 6),
        toy - headlen * Math.sin(angle + Math.PI / 6)
      );
    }
  }

  function processDataFromState(x: number, y: number, orient: number, angularVel: number) {
    let posx = x * 100;
    let posy = y * 100;

    return { x: posx, y: posy, orient: orient };
  }

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <canvas
        onClick={(e) => getMousePos(canvasRef.current, e)}
        ref={canvasRef}
        id='myCanvas'
        style={{ border: '1px solid #000000' }}
      ></canvas>
    </div>
  );
};

export default Canvas2DRobot;
