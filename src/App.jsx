import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useLocation } from "react-router-dom"

import Events from "./routes/Events"
import News from "./routes/Sponsors"
import Home from "./routes/Home"
import Links from "./routes/Links"
import Settings from "./routes/Settings"

import Nav from "./components/Nav"
import Footer from "./components/Footer"
import ScrollToTop from './components/ScrollToTop'

import { adService } from './plugins/ads';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

import './styles.css'
import './i18n/i18n'

function App() {
  const { i18n } = useTranslation();

  const location = useLocation();

  useEffect(() => {
    adService.initialize();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      adService.tryShowInterstitial();
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const notificationsEnabled = localStorage.getItem('notificationsEnabled');
    const isEnabled = notificationsEnabled === null ? true : notificationsEnabled === 'true';

    if (!isEnabled) {
      console.log("Notificaciones deshabilitadas por el usuario");
      return;
    }

    LocalNotifications.requestPermissions();

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === "granted") {
        PushNotifications.register();
      } else {
        console.log("Permiso denegado para notificaciones");
      }
    });

    PushNotifications.addListener('registration', token => {
      console.log("Token del dispositivo:", token.value);
    });

    PushNotifications.addListener('registrationError', err => {
      console.error("❌ Error registrando el dispositivo:", err);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log("🔔 Notificación recibida:", notification);

      const enabled = localStorage.getItem('notificationsEnabled') !== 'false';
      if (!enabled) return;

      LocalNotifications.schedule({
        notifications: [
          {
            title: notification.title || 'Notificación',
            body: notification.body || '',
            id: Math.floor(Math.random() * 100000),
            schedule: { at: new Date(Date.now() + 100) },
            sound: undefined,
            attachments: undefined,
            actionTypeId: "",
            extra: notification.data
          }
        ]
      });
    });

    PushNotifications.addListener('pushNotificationActionPerformed', action => {
      console.log("🖱 Usuario tocó la notificación:", action);
    });

  }, []);


  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/events" element={<Events />} />
        <Route path="/sponsors" element={<News />} />
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<Links />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
      <Nav />
    </>
  )
}

export default App
