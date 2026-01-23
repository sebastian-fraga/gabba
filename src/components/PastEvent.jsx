import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function PastEvent({ imagen, lugar, fecha, nombre, descripcion, videoResumen, galeria, creditos }) {

    return (
        <article className="rounded-2xl flex flex-col w-90 max-w-md bg-lime-50/95 p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">

            <div className="relative overflow-hidden rounded-xl mb-4 shadow-lg shadow-black">
                <img
                    className="w-full h-auto object-cover"
                    src={imagen}
                    alt={`Flyer de ${nombre}`}
                />
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <h3 className="font-bold text-2xl text-neutral-900 leading-tight">
                    {nombre}
                </h3>

                <div className="flex flex-col gap-2 text-neutral-700">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-rounded text-green-700">
                            pin_drop
                        </span>
                        <span className="text-sm font-medium">{lugar}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="material-symbols-rounded text-green-700">
                            calendar_clock
                        </span>
                        <span className="text-sm font-medium">{fecha}</span>
                    </div>
                </div>
            </div>

            <p className="text-neutral-700 leading-relaxed text-sm mb-4">
                {descripcion}
            </p>

            {videoResumen && (
                <a
                    href={videoResumen}
                    className="mt-auto inline-flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg active:bg-green-800 transition-colors duration-200 text-sm font-medium"
                >
                    <span className="material-symbols-rounded">
                        play_circle
                    </span>
                    Ver resumen en YouTube
                </a>
            )}

            {galeria?.length > 0 && (
                <>
                    <Swiper
                        spaceBetween={12}
                        slidesPerView={1.3}
                        className="w-full h-48 mt-4 bg-lime-300/30"
                    >
                        {galeria.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`Imagen ${index + 1} de ${nombre}`}
                                    className="w-full h-full object-cover rounded-2xl p-2"
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                    <span className='text-center mt-2 font-medium text-lg'>Créditos a {creditos}</span>
                </>
            )}
                

        </article>
    )
}
export default PastEvent