import SocialLink from '../components/SocialLink.jsx'

import Form from '../images/form.svg'
import Instagram from '../images/instagram.svg'
import TikTok from '../images/tiktok.svg'
import YouTube from '../images/youtube.svg'
import Spotify from '../images/Spotify.svg'
import WhatsApp from '../images/whatsapp.svg'
import Linktree from '../images/linktree.svg'

function Links() {

    const links = [
        {
            href: "https://gabbagabbaradio.netlify.app/contacto.html",
            img: Form,
            name: "Formulario",
            user: "Vení al programa con tu banda!"
        },
        {
            href: "https://www.instagram.com/gabba.gabba.fest",
            img: Instagram,
            name: "Instagram",
            user: "@gabba.gabba.fest"
        },
        {
            href: "https://www.tiktok.com/@gabbagabbafest",
            img: TikTok,
            name: "TikTok",
            user: "@gabbagabbafest"
        },
        {
            href: "https://www.youtube.com/@GabbaRadiook",
            img: YouTube,
            name: "YouTube",
            user: "@Gabbaradiook"
        },
        {
            href: "https://open.spotify.com/show/2US6Gd6PdTK1uuzH7npfgc",
            img: Spotify,
            name: "Spotify",
            user: "Gabba Gabba Radio"
        },
        {
            href: "https://www.whatsapp.com/channel/0029Vb0gqPdCRs1w6oI01i3E",
            img: WhatsApp,
            name: "WhatsApp",
            user: "Seguinos en nuestro canal!"
        },
        {
            href: "https://linktr.ee/gabbagabbaradio",
            img: Linktree,
            name: "Linktree",
            user: "Todas nuestras redes"
        },
    ]
    return (
        <main className="flex flex-col justify-between gap-50 mx-1.5 h-full pb-50">
            <header className="flex justify-center gap-4 items-center w-full mt-12">
                <h2 className="text-(--text-green) text-4xl font-semibold">LINKS DE GABBA</h2>
            </header>
            <section className="grid grid-cols-2 grid-rows-4 gap-2">
                {links.map((link, index) => (
                    <SocialLink
                        key={index}
                        href={link.href}
                        img={link.img}
                        name={link.name}
                        user={link.user}
                    />
                ))}
            </section>
        </main>
    )
}
export default Links