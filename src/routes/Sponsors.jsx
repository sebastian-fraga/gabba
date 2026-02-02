import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Trans } from "react-i18next";

function Sponsors() {
    const { t } = useTranslation();
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        fetch('https://s3.us-east-1.amazonaws.com/gabba.new/sponsors.json')
            .then(response => response.json())
            .then(data => {
                setSponsors(data.sponsors);
            })
            .catch(error => {
                console.error('Error cargando sponsors:', error);
            });
    }, []);


    return (
        <main className="flex flex-col gap-25 mx-1.5 h-full pb-7">
            <header className="flex justify-center gap-4 items-center w-full mt-12">
                <h2 className="text-(--main-title) text-4xl font-semibold">{t('sponsors.title')}</h2>
            </header>

            <section className="flex flex-col mx-5 gap-2">
                <h3 className="text-(--main-text) text-center text-lg font-semibold leading-7 text-balance">
                    {t('sponsors.description')}
                </h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                    {sponsors.map(sponsor => (
                        <a
                            key={sponsor.id}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" flex items-center bg-neutral-800 rounded-2xl p-4 border border-neutral-700 active:border-lime-500 active:scale-90 transition-colors mx-auto last:self-center last:col-span-full"
                        >
                            <img
                                src={sponsor.imageUrl}
                                alt={sponsor.name} loading='lazy'
                                className="w-45 h-auto object-contain"
                            />
                        </a>
                    ))}
                </div>
                <p className="text-center text-balance text-(--main-text) mt-20">
                    <Trans
                        i18nKey="sponsors.contact"
                        components={{
                            1: (
                                <a
                                    href="mailto:gabbaradioramona@gmail.com"
                                    className="text-(--main-title)"
                                />
                            )
                        }}
                    />
                </p>
            </section>
        </main>
    );
}


export default Sponsors;