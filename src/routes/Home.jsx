import { useTranslation } from 'react-i18next';

import { useEffect, useState } from "react"

import appIcon from "../images/icon.webp"

import Carousel from "../components/Carousel"
import LiveEvent from "../components/LiveEvent"

function Home() {

    const { t } = useTranslation();

    const [radioData, setRadioData] = useState([])
    const [videosData, setVideosData] = useState([])
    const [liveEvents, setLiveEvents] = useState([])


    useEffect(() => {
        fetch('https://s3.us-east-1.amazonaws.com/gabba.new/radio.json')
            .then(res => res.json())
            .then(data => setRadioData(data))
            .catch(err => console.error("radio error", err))

        fetch("https://s3.us-east-1.amazonaws.com/gabba.new/videos.json")
            .then(res => res.json())
            .then(data => setVideosData(data))
            .catch(err => console.error("videos error", err))

        fetch("https://s3.us-east-1.amazonaws.com/gabba.new/events.json")
            .then(res => res.json())
            .then(data => setLiveEvents(data))
            .catch(err => console.error("events error", err))

    }, [])

    return (
        <>
            <main className="flex flex-col justify-center gap-20 pb-20 mx-1.5">
                <header className="flex justify-center gap-4 items-center w-full mt-12">
                    <h1 className="text-(--main-title) text-7xl font-semibold">GABBA</h1>
                    <img className="w-30 " src={appIcon} />
                </header>
                <Carousel data={radioData} title={t('home.shows')} tagsType="radio" />
                <Carousel data={videosData} title="VIDEOS" tagsType="video" />
                <LiveEvent data={liveEvents} />

            </main >
        </>
    )
}
export default Home