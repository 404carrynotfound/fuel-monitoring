import { useEffect } from 'react';

const useScreenChangeEffect = (isSmallScreen: boolean, callback: (isSmall: boolean) => void): void => {
    useEffect(() => {
        callback(isSmallScreen);
    }, [callback, isSmallScreen]);
};

export default useScreenChangeEffect;
