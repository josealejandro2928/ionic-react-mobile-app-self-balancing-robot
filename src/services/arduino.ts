import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { IRobotState } from '../store/reducers/robot.reducer';

///////////////////////////////////////
const COMMAND_SETPOINT_SPEEDS = 'A';
const COMMAND_GETSTATE = 'B';
const SET_PID_K_INCLINATION = 'C';
const GET_PID_K_INCLINATION = 'D';
const SET_PID_K_VELOCITY = 'E';
const GET_PID_K_VELOCITY = 'F';
const SET_PID_K_ANGULAR_VELOCITY = 'G';
const GET_PID_K_ANGULAR_VELOCITY = 'H';
const RESET_DYNAMICAL_STATE = 'R';
const POINT_TRACKER_MODE = 'P';
const STOP_POINT_TRACKER_MODE = 'S';
const GET_BATTERY_STATE = 'T';
const GET_CONSTANT_PARAMETERS = 'J';
const SET_CONSTANT_PARAMETERS = 'K';
///////////////////////////////////////

//////Data typing//////
export function convertFloat2Uint8Array(src: any, type: any): any {
  let buffer = new ArrayBuffer(src.byteLength);
  new src.constructor(buffer).set(src);
  return new type(buffer);
}

export function strToBuffer(string: string): any {
  let arrayBuffer = new ArrayBuffer(string.length * 1);
  let newUint = new Uint8Array(arrayBuffer);
  newUint.forEach((_, i) => {
    newUint[i] = string.charCodeAt(i);
  });
  return newUint;
}

export function copyObject(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export async function delayMs(ms = 0) {
  return new Promise((resolve, _) => {
    setTimeout(resolve, ms);
  });
}

/////////////////////////// INTERFACE TO CONNECT TO ARDUINO ////////////////////////
export async function getRobotStateArduino(): Promise<IRobotState> {
  const AMOUNT_DATA_BLUETOOTH_STATE = 7;
  let state: number[] = [];
  await BluetoothSerial.write(COMMAND_GETSTATE);
  let count = await BluetoothSerial.available();
  // 7x4 + 7x1 + 1
  while (count < 44) {
    // console.log("🚀 ~ file: arduino.ts ~ line 53 ~ getRobotStateArduino ~ count", count)
    count = await BluetoothSerial.available();
  }
  for (let i = 0; i < AMOUNT_DATA_BLUETOOTH_STATE; i++) {
    let data: string = await BluetoothSerial.readUntil('\n');
    if (data && data !== '' && data.length > 1) {
      state.push(parseFloat(data));
    }
  }
  const rState: IRobotState = {
    linearVelocity: state[0] || 0.0,
    angularVelocity: state[1] || 0.0,
    incliAngle: state[2] || 0.0,
    posX: state[3] || 0.0,
    posY: state[4] || 0.0,
    robotOrien: state[5] || 0,
    battery: state[6] || 0,
  };
  await BluetoothSerial.clear();
  return rState;
}

/**
 * @return [Kc, Kp, Kd]
 */

export async function getConstantPIDInclinationArduino(): Promise<any> {
  const estado: any[] = [];
  await BluetoothSerial.write(GET_PID_K_INCLINATION);
  let count = await BluetoothSerial.available();
  while (count < 20) {
    count = await BluetoothSerial.available();
  }
  for (let i = 0; i < 3; i++) {
    const data = await BluetoothSerial.readUntil('\n');
    if (data && data !== '' && data.length > 1) {
      estado.push(parseFloat(data));
    }
  }
  await BluetoothSerial.clear();
  return estado;
}

export async function setConstantPIDInclinationArduino(kc: number, ki: number, kd: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([kc, ki, kd]), Uint8Array);
  await BluetoothSerial.write(SET_PID_K_INCLINATION);
  await BluetoothSerial.write(data);
}

/**
 * @return [Kc, Kp, Kd]
 */
export async function getConstantPIDVelocityArduino(): Promise<any> {
  const estado: any[] = [];
  await BluetoothSerial.write(GET_PID_K_VELOCITY);
  let count = await BluetoothSerial.available();
  while (count < 14) {
    count = await BluetoothSerial.available();
  }
  for (let i = 0; i < 3; i++) {
    const data = await BluetoothSerial.readUntil('\n');
    if (data && data !== '' && data.length > 1) {
      estado.push(parseFloat(data));
    }
  }
  await BluetoothSerial.clear();
  return estado;
}

export async function setConstantPIDVelocityArduino(kc: number, ki: number, kd: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([kc, ki, kd]), Uint8Array);
  await BluetoothSerial.write(SET_PID_K_VELOCITY);
  await BluetoothSerial.write(data);
}

export async function getConstantPIDAngularVelocityArduino(): Promise<any> {
  const estado: any[] = [];
  await BluetoothSerial.write(GET_PID_K_ANGULAR_VELOCITY);
  let count = await BluetoothSerial.available();
  while (count < 14) {
    count = await BluetoothSerial.available();
  }
  for (let i = 0; i < 3; i++) {
    const data = await BluetoothSerial.readUntil('\n');
    if (data && data !== '' && data.length > 1) {
      estado.push(parseFloat(data));
    }
  }
  await BluetoothSerial.clear();
  return estado;
}

export async function setConstantPIDAngularVelocityArduino(kc: number, ki: number, kd: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([kc, ki, kd]), Uint8Array);
  await BluetoothSerial.write(SET_PID_K_ANGULAR_VELOCITY);
  await BluetoothSerial.write(data);
}

export async function setRobotSetPointSpeedsArduino(velocity: number, angular_velocity: number) {
  const data: Uint8Array = convertFloat2Uint8Array(
    new Float32Array([velocity, angular_velocity]),
    Uint8Array
  );
  await BluetoothSerial.write(COMMAND_SETPOINT_SPEEDS);
  await BluetoothSerial.write(data);
}

export async function setRobotPointTrakerArduino(posX: number, posY: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([posX, posY]), Uint8Array);
  await BluetoothSerial.write(POINT_TRACKER_MODE);
  await BluetoothSerial.write(data);
}

export async function stopRobotPointTrackerArduino() {
  await BluetoothSerial.write(STOP_POINT_TRACKER_MODE);
}

export async function resetDynamicalStateArduino(): Promise<any> {
  await BluetoothSerial.write(RESET_DYNAMICAL_STATE);
}

export async function getBatteryStatusArduino(): Promise<any> {
  await BluetoothSerial.write(GET_BATTERY_STATE);
  let count = await BluetoothSerial.available();
  while (count < 5) {
    count = await BluetoothSerial.available();
  }
  const data = await BluetoothSerial.readUntil('\n');
  let battery = 0.0;

  if (data && data !== '' && data.length > 1) {
    battery = parseFloat(data);
  }

  await BluetoothSerial.clear();
  return battery;
}

export async function getConstantParameters(): Promise<any> {
  const estado: any[] = [];
  await BluetoothSerial.clear();
  await BluetoothSerial.write(GET_CONSTANT_PARAMETERS);
  let count = await BluetoothSerial.available();
  while (count < 6) {
    count = await BluetoothSerial.available();
  }
  for (let i = 0; i < 1; i++) {
    const data = await BluetoothSerial.readUntil('\n');
    if (data && data !== '' && data.length > 1) {
      estado.push(parseFloat(data));
    }
  }
  await BluetoothSerial.clear();
  return estado;
}

export async function setConstantParameters(minPwmSpeed: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([minPwmSpeed]), Uint8Array);
  await BluetoothSerial.write(SET_CONSTANT_PARAMETERS);
  await BluetoothSerial.write(data);
}

////////////////////////////////////////////////////////////////////////////////////
