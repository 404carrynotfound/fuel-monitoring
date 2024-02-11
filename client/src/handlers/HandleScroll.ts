import { useEffect, useCallback } from 'react';
import { CallbackProps } from './CallbackProps.ts';

const useScrollHandler = ({ callback }: CallbackProps): void => {
    const handleScroll = useCallback(() => {
        callback();
    }, [callback]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
};

export default useScrollHandler;
