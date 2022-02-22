import { useEffect, useRef } from 'react';

const useEffectUpdate = (callback: Function, dependencies: Array<any>) => {
  const refObj = useRef(true);

  useEffect(() => {
    if (refObj.current) {
      refObj.current = false;
      return;
    }
    callback();
  }, dependencies);
};

export default useEffectUpdate;
