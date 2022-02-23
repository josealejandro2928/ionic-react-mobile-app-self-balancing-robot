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
///////////////////////////////////////

//////Data typing//////
export function convertFloat2Uint8Array(src: any, type: any): any {
  let buffer = new ArrayBuffer(src.byteLength);
  // let baseView = new src.constructor(buffer).set(src);
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
export async function arduinoGetRobotState(): Promise<IRobotState> {
  const AMOUNT_DATA_BLUETOOTH_STATE = 7;
  await BluetoothSerial.write(COMMAND_GETSTATE);
  let state: number[] = [];
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
export async function getConstantPIDInclination(): Promise<any> {
  await BluetoothSerial.write(GET_PID_K_INCLINATION);
  let estado = [];
  for (let i = 0; i < 3; i++) {
    let data = await BluetoothSerial.readUntil('\n');
    if (data && data !== '') {
      estado.push(parseFloat(data || 0.0));
    }
  }
  await BluetoothSerial.clear();
  return estado;
}

export async function setConstantPIDInclination(kc: number, ki: number, kd: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([kc, ki, kd]), Uint8Array);
  await BluetoothSerial.write(SET_PID_K_INCLINATION);
  await BluetoothSerial.write(data);
}

/**
 * @return [Kc, Kp, Kd]
 */
export async function getConstantPIDVelocity(): Promise<any> {
  await BluetoothSerial.write(GET_PID_K_VELOCITY);
  let estado = [];
  for (let i = 0; i < 3; i++) {
    let data = await BluetoothSerial.readUntil('\n');
    if (data && data !== '') {
      estado.push(parseFloat(data || 0.0));
    }
  }
  await BluetoothSerial.clear();
  return estado;
}

export async function setConstantPIDVelocity(kc: number, ki: number, kd: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([kc, ki, kd]), Uint8Array);
  await BluetoothSerial.write(SET_PID_K_VELOCITY);
  await BluetoothSerial.write(data);
}

export async function getConstantPIDAngularVelocity(): Promise<any> {
  await BluetoothSerial.write(GET_PID_K_ANGULAR_VELOCITY);
  let estado = [];
  for (let i = 0; i < 3; i++) {
    let data = await BluetoothSerial.readUntil('\n');
    if (data && data !== '') {
      estado.push(parseFloat(data || 0.0));
    }
  }
  await BluetoothSerial.clear();
  return estado;
}

export async function setConstantPIDAngularVelocity(kc: number, ki: number, kd: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([kc, ki, kd]), Uint8Array);
  await BluetoothSerial.write(SET_PID_K_ANGULAR_VELOCITY);
  await BluetoothSerial.write(data);
}

export async function setRobotSetPointSpeeds(velocity: number, angular_velocity: number) {
  const data: Uint8Array = convertFloat2Uint8Array(
    new Float32Array([velocity, angular_velocity]),
    Uint8Array
  );
  await BluetoothSerial.write(COMMAND_SETPOINT_SPEEDS);
  await BluetoothSerial.write(data);
}

export async function setRobotPointTraker(posX: number, posY: number) {
  const data: Uint8Array = convertFloat2Uint8Array(new Float32Array([posX, posY]), Uint8Array);
  await BluetoothSerial.write(POINT_TRACKER_MODE);
  await BluetoothSerial.write(data);
}

export function stopRobotPointTracker(): Promise<any> {
  return BluetoothSerial.write(STOP_POINT_TRACKER_MODE);
}

export function resetDynamicalState(): Promise<any> {
  return BluetoothSerial.write(RESET_DYNAMICAL_STATE);
}

////////////////////////////////////////////////////////////////////////////////////
