import { AdMob, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const AD_CONFIG = {
    useTestAds: false,

    interstitialIds: {
        test: 'ca-app-pub-3573257060880072/6008558770',
        production: 'ca-app-pub-3573257060880072/6008558770',
    },

    minMinutesBetweenAds: 1,
};

export const adService = {
    state: {
        lastAdTimestamp: 0,
        isAdReady: false,
        listenersConfigured: false,
    },

    initialize: async () => {
        if (!Capacitor.isNativePlatform()) return;

        try {
            await AdMob.initialize();
            console.log('✅ AdMob inicializado');

            try {
                await AdMob.hideBanner();
            } catch {
                // Ignore error if banner is not available
            }

            if (!adService.state.listenersConfigured) {
                adService.setupListeners();
                adService.state.listenersConfigured = true;
            }

            await adService.preloadInterstitial();

        } catch (e) {
            console.error('❌ Error inicializando AdMob:', e);
        }
    },

    setupListeners: () => {
        AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
            console.log('✅ Interstitial listo');
            adService.state.isAdReady = true;
        });

        AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (err) => {
            console.error('❌ Error cargando:', err);
            adService.state.isAdReady = false;
        });

        AdMob.addListener(InterstitialAdPluginEvents.Dismissed, async () => {
            console.log('👋 Anuncio cerrado');
            adService.state.lastAdTimestamp = Date.now();
            adService.state.isAdReady = false;

            setTimeout(() => adService.preloadInterstitial(), 2000);
        });
    },

    preloadInterstitial: async () => {
        if (!Capacitor.isNativePlatform()) return;

        try {
            const adId = AD_CONFIG.useTestAds
                ? AD_CONFIG.interstitialIds.test
                : AD_CONFIG.interstitialIds.production;

            await AdMob.prepareInterstitial({ adId });
            console.log('📦 Interstitial precargado');

        } catch (e) {
            console.error('❌ Error precargando:', e);
        }
    },


    tryShowInterstitial: async () => {
        if (!Capacitor.isNativePlatform()) return false;

        if (!adService.state.isAdReady) {
            console.log('⏳ Anuncio no está listo');
            return false;
        }

        const now = Date.now();
        const minMilliseconds = AD_CONFIG.minMinutesBetweenAds * 60 * 1000;
        const timeSinceLastAd = now - adService.state.lastAdTimestamp;

        if (adService.state.lastAdTimestamp > 0 && timeSinceLastAd < minMilliseconds) {
            const minutesLeft = Math.ceil((minMilliseconds - timeSinceLastAd) / 60000);
            console.log(`⏰ Espera ${minutesLeft} minuto(s) más`);
            return false;
        }

        try {
            await AdMob.showInterstitial();
            console.log('✅ Anuncio mostrado');
            return true;
        } catch (e) {
            console.error('❌ Error mostrando:', e);
            return false;
        }
    },
};