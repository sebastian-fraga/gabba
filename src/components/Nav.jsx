import { NavLink } from "react-router-dom"

function Nav() {
    const base = "flex flex-col items-center transition-all w-30"
    const active = "text-white scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,.5)]"
    const inactive = "text-neutral-500/70 scale-85"

    return (
        <nav className="flex justify-center items-center gap-3 fixed bottom-0 w-screen py-4 px-7 bg-linear-180 from-black/75 to-black text-2xl rounded-t-2xl backdrop-blur-xl z-1000">
            <NavLink to="/events"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`
                }
            >
                <span className="material-symbols-rounded">event</span>
                <span className="text-xl">Eventos</span>

            </NavLink >

            <NavLink
                to="/news"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >

                <span className="material-symbols-rounded">newspaper</span>
                <span className="text-xl">Noticias</span>
            </NavLink>

            <NavLink
                to="/"
                end
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >
                <span className="material-symbols-rounded">home</span>
                <span className="text-xl">Inicio</span>
            </NavLink>
            <NavLink
                to="/links"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >

                <span className="material-symbols-rounded">link</span>
                <span className="text-xl">Links</span>
            </NavLink>
            <NavLink
                to="/settings"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >

                <span className="material-symbols-rounded">settings</span>
                <span className="text-xl">Opciones</span>
            </NavLink>
        </nav>
    )
}

export default Nav