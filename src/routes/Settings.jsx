import { useState } from "react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-neutral-700 rounded-3xl w-11/12 max-w-md p-6 shadow-2xl border border-neutral-500">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-neutral-100 text-2xl font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="material-symbols-rounded text-neutral-300 hover:text-neutral-100 transition-colors"
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

function Settings() {
    const [notifications, setNotifications] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", content: "" });

    const openModal = (label) => {
        const content = {
            "Idioma": {
                title: "Idioma",
                content: "Selecciona tu idioma preferido para la aplicación."
            },
            "Tema": {
                title: "Tema",
                content: "Elige entre tema claro, oscuro o automático."
            },
            "Acerca de": {
                title: "Acerca de",
                content: "Versión 1.0.0 - Desarrollado con React"
            },
        };

        setModalContent(content[label] || { title: label, content: "Contenido en desarrollo" });
        setModalOpen(true);
    };

    const settingsSections = [
        {
            title: "Preferencias",
            items: [
                {
                    icon: "notifications",
                    label: "Notificaciones",
                    type: "toggle",
                },
                {
                    icon: "language",
                    label: "Idioma",
                    value: "Español"
                },
                {
                    icon: "palette",
                    label: "Tema",
                    value: "Oscuro"
                },
            ],
        },
        {
            title: "Aplicación",
            items: [
                {
                    icon: "info",
                    label: "Acerca de",
                    value: "v1.0.0"
                },
                {
                    icon: "policy",
                    label: "Política de privacidad",
                    type: "external",
                    url: ""
                },
                {
                    icon: "policy",
                    label: "Términos de uso",
                    type: "external",
                    url: ""
                },
                {
                    icon: "favorite",
                    label: "Valorar app",
                    type: "external",
                    url: ""
                },
            ],
        },
    ];

    return (
        <>
            <main className="flex flex-col gap-20 mx-1.5 h-full pb-50">
                <header className="flex justify-center gap-4 items-center w-full mt-12">
                    <h2 className="text-lime-300 text-4xl font-semibold">AJUSTES</h2>
                </header>
                {settingsSections.map((section, index) => (
                    <section key={index} className="flex flex-col gap-2 mx-5">
                        <h3 className="text-neutral-300 text-xl mb-1">{section.title}</h3>

                        <div className="flex flex-col gap-3 bg-linear-210 from-neutral-950 to-neutral-800 rounded-2xl p-3 border border-neutral-700 ml-1.5">
                            {section.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between pb-1.5 border-b border-b-neutral-400/20 last:border-0 cursor-pointer active:bg-neutral-800/5 active:rounded-4xl active:px-1 duration-75 transition-all"
                                    onClick={() => {
                                        if (!item.type || item.type === "modal") openModal(item.label);
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
                                        <a
                                            href={item.url}
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
            </main>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent.title}
            >
                <p>{modalContent.content}</p>
            </Modal>
        </>
    );
}

export default Settings;