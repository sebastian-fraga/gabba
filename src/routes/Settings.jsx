import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Toggle({ value, onChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={() => onChange(!value)}
            />

            <div className="relative w-11 h-6 bg-neutral-400 rounded-full transition-colors peer-checked:bg-lime-500">
            </div>

            <span
                className="
                    absolute
                    top-0.5 left-0.5
                    w-5 h-5
                    bg-white
                    rounded-full
                    transition-transform duration-300 ease-in-out
                    peer-checked:translate-x-5
                "
            />
        </label>
    );
}

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-5000 flex items-end justify-center animate-fadeIn">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-neutral-700/75 backdrop-blur-md rounded-t-3xl w-full max-w-md p-6 shadow-2xl border-t border-neutral-500 animate-slideUp">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-neutral-100 text-2xl font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="material-symbols-rounded text-neutral-300 active:text-neutral-100 active:scale-80 transition-all"
                    >
                        close
                    </button>
                </div>

                <div className="text-neutral-200">
                    {children}
                </div>
            </div>
        </div>
    );
}

function LanguageSelector({ onChangeLanguage }) {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col gap-3">
            <button
                className={`px-4 py-2 rounded transition-colors ${i18n.language === 'es' ? 'bg-lime-500 text-white' : 'bg-neutral-700 text-neutral-200'}`}
                onClick={() => onChangeLanguage('es')}
            >
                {t('settings.spanish')}
            </button>
            <button
                className={`px-4 py-2 rounded transition-colors ${i18n.language === 'en' ? 'bg-lime-500 text-white' : 'bg-neutral-700 text-neutral-200'}`}
                onClick={() => onChangeLanguage('en')}
            >
                {t('settings.english')}
            </button>
        </div>
    );
}

function ThemeSelector({ onChangeTheme, currentTheme }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-3">
            <button
                className={`px-4 py-2 rounded transition-colors ${currentTheme === 'dark' ? 'bg-lime-500 text-white' : 'bg-neutral-700 text-neutral-200'}`}
                onClick={() => onChangeTheme('dark')}
            >
                {t('settings.dark')}
            </button>
            <button
                className={`px-4 py-2 rounded transition-colors ${currentTheme === 'light' ? 'bg-lime-500 text-white' : 'bg-neutral-700 text-neutral-200'}`}
                onClick={() => onChangeTheme('light')}
            >
                {t('settings.light')}
            </button>
        </div>
    );
}

function About() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col">
                <h1 className="text-lg">Gabba - App Ramonera</h1>
                <span className="text-sm">{t('settings.about-version')} 3.0.0</span>
            </div>
            <div className="flex flex-col">
                <h1>{t('settings.about-developed')} Sebastián Fraga</h1>
                <a className="text-lime-300" href="https://github.com/sebastian-fraga" target="_blank" rel="noreferrer noopener">{t('settings.about-contact')}</a>
            </div>
        </div>
    )
}

function Settings() {


    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('notificationsEnabled');
        return saved === null ? true : saved === 'true';
    });

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'light') {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        } else {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.add('dark-theme');
        }
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", content: null });

    const openModal = (labelKey, item) => {
        if (item.icon === "language") {
            setModalContent({
                title: t('settings.language'),
                content: () => <LanguageSelector onChangeLanguage={changeLanguage} />
            });
            setModalOpen(true);
            return;
        }

        if (item.icon === "palette") {
            setModalContent({
                title: t('settings.theme'),
                content: () => <ThemeSelector onChangeTheme={changeTheme} currentTheme={theme} />
            });
            setModalOpen(true);
            return;
        }

        if (item.icon === "info") {
            setModalContent({
                title: t('settings.about'),
                content: () => <About />
            });
            setModalOpen(true);
            return;
        }
    };

    const settingsSections = [
        {
            title: t('settings.preferences'),
            items: [
                {
                    icon: "notifications",
                    label: t('settings.notifications'),
                    type: "toggle",
                },
                {
                    icon: "language",
                    label: t('settings.language'),
                    value: i18n.language === 'es' ? t('settings.spanish') : t('settings.english'),
                },
                {
                    icon: "palette",
                    label: t('settings.theme'),
                    value: theme === 'light' ? t('settings.light') : t('settings.dark')
                },
            ],
        },
        {
            title: t('settings.application'),
            items: [
                {
                    icon: "info",
                    label: t('settings.about'),
                    value: "v3.0.0"
                },
                {
                    icon: "policy",
                    label: t('settings.privacy'),
                    type: "external",
                    url: "https://gabbaprivacy.netlify.app/"
                },
                {
                    icon: "contract",
                    label: t('settings.terms'),
                    type: "external",
                    url: "https://gabbaterms.netlify.app/"
                },
                {
                    icon: "favorite",
                    label: t('settings.rate'),
                    type: "external",
                    url: "https://play.google.com/store/apps/details?id=com.gabba.app"
                },
            ],
        },
    ];

    return (
        <>
            <main className="flex flex-col gap-20 mx-1.5 h-full pb-50">
                <header className="flex justify-center gap-4 items-center w-full mt-12">
                    <h2 className="text-(--main-title) text-4xl font-semibold ">{t('settings.title')}</h2>
                </header>
                {settingsSections.map((section, index) => (
                    <section key={index} className="flex flex-col gap-2 mx-5">
                        <h3 className="text-(--main-text) text-xl mb-1">{section.title}</h3>

                        <div className="flex flex-col gap-3 bg-linear-210 from-neutral-950 to-neutral-800 rounded-2xl p-3 border border-neutral-700 ml-1.5">
                            {section.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between pb-1.5 border-b border-b-neutral-400/20 last:border-0 cursor-pointer active:bg-neutral-800/5 active:rounded-4xl active:px-1 duration-75 transition-all"
                                    onClick={() => {
                                        if (!item.type || item.type === "modal") openModal(item.label, item);
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-rounded unfilled bg-neutral-700 p-2 rounded-lg text-neutral-100 scale-75">
                                            {item.icon}
                                        </span>
                                        <span className="text-neutral-100 text-base font-extralight">{item.label}</span>
                                    </div>

                                    {item.type === "toggle" ? (
                                        <Toggle
                                            value={notifications}
                                            onChange={setNotifications}
                                        />
                                    ) : item.type === "external" ? (

                                        <a href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="material-symbols-rounded unfilled text-neutral-300/70 active:text-neutral-100 transition-colors duration-25"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            open_in_new
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span className="text-neutral-400/80">{item.value}</span>
                                            <span
                                                className="material-symbols-rounded unfilled text-neutral-300/70 active:text-neutral-100 transition-colors duration-25"
                                            >
                                                chevron_right
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </section>
                ))}
            </main >

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent.title}
            >
                {typeof modalContent.content === 'function' ? modalContent.content() : modalContent.content}
            </Modal>
        </>
    );
}

export default Settings;