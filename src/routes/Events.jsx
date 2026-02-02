import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';

import PastEvent from "../components/PastEvent"

function Events() {

    const { t } = useTranslation();

    const [pastEventsData, setPastEventsData] = useState([])


    useEffect(() => {
        fetch('https://s3.us-east-1.amazonaws.com/gabba.new/pastevents.json')
            .then(res => res.json())
            .then(data => setPastEventsData(data))
            .catch(err => console.error("events error", err))
    }, [])
    return (
        <main className="flex flex-col justify-between items-center gap-20 mx-1.5 h-full pb-50">
            <header className="flex justify-center items-center w-full mt-12">
                <h2 className="text-(--main-title) text-4xl font-semibold">{t('events.title')}</h2>
            </header>
            <section className="flex flex-col gap-20">
                {pastEventsData.map((event, index) => (
                    <PastEvent
                        key={index}
                        imagen={event.imagen}
                        lugar={event.lugar}
                        fecha={event.fecha}
                        nombre={event.nombre}
                        descripcion={event.descripcion}
                        videoResumen={event.videoResumen}
                        galeria={event.galeria}
                        creditos={event.creditos}
                    />
                ))}
            </section>

        </main>
    )
}
export default Events