import { NavLink } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function Nav() {
    const base = "flex flex-col items-center transition-all w-30"
    const active = "text-(--nav-active) scale-110 drop-shadow-(--nav-active-shadow)"
    const inactive = "text-neutral-500/70 scale-85"

    const { t } = useTranslation();

    return (
        <nav className="flex justify-center items-center gap-3 fixed bottom-0 w-screen py-4 px-7 bg-linear-180 from-(--nav-bg-from) to-(--nav-bg-to) text-2xl rounded-t-2xl backdrop-blur-xl z-1000">
            <NavLink to="/events"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`
                }
            >
                <span className="material-symbols-rounded">event_repeat</span>
                <span className="text-xl">{t('footer.events')}</span>

            </NavLink >

            <NavLink
                to="/sponsors"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >

                <span className="material-symbols-rounded">groups</span>
                <span className="text-xl">{t('footer.sponsors')}</span>
            </NavLink>

            <NavLink
                to="/"
                end
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >
                <span className="material-symbols-rounded">home</span>
                <span className="text-xl">{t('footer.home')}</span>
            </NavLink>
            <NavLink
                to="/links"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >

                <span className="material-symbols-rounded">link</span>
                <span className="text-xl">{t('footer.links')}</span>
            </NavLink>
            <NavLink
                to="/settings"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >

                <span className="material-symbols-rounded">settings</span>
                <span className="text-xl">{t('footer.settings')}</span>
            </NavLink>
        </nav>
    )
}

export default Nav