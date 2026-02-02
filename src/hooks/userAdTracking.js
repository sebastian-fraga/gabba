// src/hooks/useAdTracking.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { adService } from '../plugins/ads';

export const useAdTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Registra cada cambio de página como una acción
        adService.trackAction();
        console.log('📍 Navegó a:', location.pathname);
    }, [location.pathname]);
};