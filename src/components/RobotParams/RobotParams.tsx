/* eslint-disable react-hooks/exhaustive-deps */
import { IonList, IonItemDivider, IonLabel, IonItem, IonRange, IonNote, useIonToast, IonButton, IonIcon } from "@ionic/react";
import { refreshOutline } from "ionicons/icons";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delayMs, getConstantParameters, setConstantParameters } from "../../services/arduino";
import { updateState } from "../../store/actions/robot.actions";
import { RootState } from "../../store/reducers";
import './RobotParams.scss'


export const RobotParams = () => {

    const [minPwmSpeed, setMinPwmSpeed] = useState<number>(0);
    const isConnected = useSelector((state: RootState) => state.bluetooth.isConnected);
    const startSampling = useSelector((state: RootState) => state.robot.startSampling);
    const dispatch = useDispatch();
    const [present] = useIonToast();
    const readytoUpdate = useRef(false)


    useEffect(() => {
        if (isConnected) {
            getData();
        }
    }, [isConnected]);

    function safeToFixed(value: any, x: number) {
        try {
            return value.toFixed(x);
        } catch (e) {
            return 0.0;
        }
    }

    useEffect(() => {
        (async () => {
            if (!readytoUpdate.current) return;
            console.log("Aqui")
            try {
                await setConstantParameters(minPwmSpeed);
            } catch (e) {
                present('Error: Something happend sending the params');
            }
        })()
    }, [minPwmSpeed])

    ///////////GETTING THE CURRENT PARAMETTERS OF THE CONTROLLERS ////////////////////////////
    async function getData() {
        try {
            ///////////// Stop the global Sampling if its runinng ///////////////////
            let lastStartSampling = startSampling;
            await dispatch(updateState({ startSampling: false }));
            await delayMs(300);
            /////////////////////////////////////////////////////////////////////
            let result = await getConstantParameters();
            setMinPwmSpeed(result[0]);
            ////////////////// RESTORE THE STATE OF GLOBAL SAMPLING ///////////////////
            await dispatch(updateState({ startSampling: lastStartSampling }));
            readytoUpdate.current = true;
        } catch (e) {
            present('The Robot is not connected, or something happend', 2000);
        }
    }

    return <div className="RobotParams">
        <IonList>
            <IonItemDivider>
                <IonLabel>Constant and Parameters</IonLabel>
            </IonItemDivider>

            <IonList>
                <IonItem>
                    <IonRange
                        debounce={100}
                        onIonChange={(e: any) => setMinPwmSpeed(e.target.value)}
                        min={0}
                        max={100}
                        step={1}
                        value={minPwmSpeed}
                    >
                        <IonLabel slot='start'>Min PWM Power</IonLabel>
                        <IonNote slot='end'>{safeToFixed(minPwmSpeed, 0)}</IonNote>
                    </IonRange>
                </IonItem>
            </IonList>
        </IonList>
        <IonList style={{ marginTop: '1px' }}>
            <IonItem disabled={!isConnected}>
                <IonLabel>Actions:</IonLabel>
                <IonLabel slot='end'>
                    <IonButton onClick={getData} fill='clear'>
                        <IonIcon icon={refreshOutline}></IonIcon>
                    </IonButton>
                </IonLabel>
            </IonItem>
        </IonList>
    </div>
}

export default memo(RobotParams);

