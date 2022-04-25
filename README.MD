
<img src="https://user-images.githubusercontent.com/37028825/165095852-d4e3799b-cde1-4269-a90a-a3489b04685a.png" height="250" />

# ionic-react-mobile-app-self-balancing-robot

This is a project in which we built a mobile application to control a custom self-balancing robot through a Bluetooth HC-08 interface. The project allows sending commands to the Arduino micro controller to perform tasks such as:

1. Movement in the 4 directions: Forward, Backward, Right and Left through a joystick interface.
2. Getting all the measurements from the robot sensors to represent the robot status in tables and graphs.
3. Change the PID controllers constants, and the maximum robots speeds.
4. Draw the map of the robot in a canvas given the measurements.

## Stack selected

The framework selected was Ionic Framework, this is a very nice an powerful tool for build android and ios mobile apps using JavaScript, HTML, and CSS.
But for this particular I selected Reactjs as a JavaScript library with typescript template.
For the state management the Redux with the plugging for react was selected.

<img src="https://user-images.githubusercontent.com/37028825/165091652-5d355ba3-e4e0-4e32-95b7-e49e36295f56.png" height="180" />

## State Models and Architecture

```tsx
////////////////////////// INTERFACES ////////////////////////
export interface IRobotState {
  linearVelocity: number;
  angularVelocity: number;
  incliAngle: number;
  posX: number;
  posY: number;
  robotOrien: number;
  battery?: number;
  startSampling?: boolean;
  sampleTime?: number;
  persistData?: boolean;
  records?: Array<{
    linearVelocity: number;
    angularVelocity: number;
    incliAngle: number;
    posX: number;
    posY: number;
    robotOrien: number;
    battery: number;
  }>;
}
/////////////////////////////////////////////////////////////////

////////////////////////TYPES////////////////////////////////

export const SET_ROBOT_DYNAMIC_STATE = 'SET_ROBOT_DYNAMIC_STATE';
export const RESET_ROBOT_DYNAMIC_STATE = 'RESET_ROBOT_DYNAMIC_STATE';
export const PERSIST_ROBOT_DYNAMIC_STATE = 'PERSIST_ROBOT_DYNAMIC_STATE';

///////////////////////////////////////////////////////////

const initialState: IRobotState = {
  linearVelocity: 0.0,
  angularVelocity: 0.0,
  incliAngle: 0.0,
  posX: 0,
  posY: 0,
  robotOrien: 0.0,
  battery: 50,
  startSampling: false,
  sampleTime: 150,
  persistData: false,
  records: [],
};
```

<img src="https://user-images.githubusercontent.com/37028825/165095116-a5686ca1-ed58-4e0a-9b98-04e010421c9a.png" height="680" />

## UI Tabs compositions

The app is composed by tabs and several components for rendering the different UIs.

1. Driver
2. Automatic
3. Adjust Controllers
4. Metrics

<img src="https://user-images.githubusercontent.com/37028825/165102821-c934f39b-0220-4a4f-b4c4-c7a608f18580.png" width="800"  />

## Work with this project

To collaborate or simply use this project you must have the android environment ready.

### 1. Download and install Android Studio and install the SDK

[https://developer.android.com/studio]

### 2. Configure the ANDROID_SDK_ROOT environment variable

If you are linux user you simply execute this or add it to the appropriate shell-specific config file.
Example: bash_profile, bashrc etc.

```sh
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### 3. Go to the AVD manager on android studio and create a simulator

### 4. Install Node

[https://nodejs.org/en/]

### 5. Install Ionic cli

[https://ionicframework.com/docs/intro/cli]

Once the repo has been downloaded, run the following commands

```sh
npm install
```

```sh
ionic serve
```

This runs the project in your web browser but the native pluggins will not work.

### 6. Create the android project

```sh
ionic cap add android
```

for generate the ios project

```sh
ionic cap add ios
```

Open the android studio in the folder android and run the app in the simulator.

For live functions and to work directly on the application mounted on the simulator run this.

```sh
npm run dev
```

## See the Robot repository

[https://github.com/josealejandro2928/Self-Balancing-Arduino-Robot-Controller]

## Demo of the app

In the root of the project you have a demo of the app ".apk"

``` sh
SB_Controller.apk
```

## videos

[![main video](https://media-exp1.licdn.com/dms/image/sync/C4E27AQHoYDjRXYum1Q/articleshare-shrink_800/0/1650225441705?e=2147483647&v=beta&t=MVa15-GMcQ24pGtz-Pgde-uTOCKB2VxyYCMe7VwTT0s)](https://www.youtube.com/watch?v=NTQIz3hWsak)
