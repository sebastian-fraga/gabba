
function LiveEvent({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="text-neutral-300 text-center py-10 text-lg text-balance flex flex-col gap-7">
                <p>
                    No hay eventos actualmente. Seguinos en <a className="text-lime-300" href="" rel="noopener noreferrer" target="_blank"> Instagram</a> para enterarte de cuando haya nuevas fechas
                </p>
                <p className="text-2xl">👽🤘</p>
            </div>
        )
    }

    return (
        <section className="index flex flex-col px-5 py-9 rounded-2xl bg-lime-400/10 border-2 border-lime-300/30">
            <h2 className="text-4xl font-bold mb-3 text-(--text-green)">PRÓXIMAS FECHAS</h2>
            {data.map((event, index) => (
                <div className="flex flex-col items-center mt-6 gap-9 text-slate-50" key={index}>
                    <h3 className="font-black text-2xl text-center">{event.titulo}</h3>
                    <div className="flex items-center gap-3">
                        <img className="rounded-2xl border-2 border-amber-300 w-50" src={event.imagen} alt={event.titulo} />
                        <div className="flex flex-col items-center justify-center gap-6">

                            <div className="flex items-center gap-3">
                                <span className="material-symbols-rounded text-lime-200">calendar_clock</span>
                                <span className="text-center font-medium text-pretty">{event.fecha}, {event.hora}</span>
                            </div>


                            <a className="flex items-center gap-3 font-medium" href={event.ubicacion}>
                                <span className="material-symbols-rounded text-lime-200 pin_icon animate-bounce">pin_drop</span>
                                <span className="text-center">{event.lugar}</span>
                            </a>
                        </div>
                    </div>
                    <a className="w-80 col-span-2 row-start-4 bg-linear-150 from-lime-700 via-lime-600  to-lime-700 px-3 py-2 rounded-xl flex justify-center items-center gap-4 outline-1 outline-lime-200 active:brightness-75 active:scale-90 transition-all" href={event.link_compra}>
                        <span className="material-symbols-rounded">
                            confirmation_number
                        </span>
                        <span className="animate-pulse">
                            COMPRAR ENTRADAS
                        </span>
                    </a>
                </div>
            ))}
        </section>
    )
}
export default LiveEvent