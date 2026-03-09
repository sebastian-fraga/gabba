
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { adService } from '../plugins/ads';

export const useAdTracking = () => {
    const location = useLocation();

    useEffect(() => {

        adService.trackAction();
        console.log('📍 Navegó a:', location.pathname);
    }, [location.pathname]);
};