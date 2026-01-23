import { useState } from "react";

function Carousel({ data, title, tagsType }) {
    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const addChip = (chip) => {
        const clean = chip.toLowerCase().trim();
        if (clean && !chips.includes(clean)) {
            setChips([...chips, clean]);
        }
        setInputValue("");
    };

    const removeChip = (chip) => {
        setChips(chips.filter((c) => c !== chip));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addChip(inputValue);
        }
        if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
            removeChip(chips[chips.length - 1]);
        }
    };

    const lowerInput = inputValue.toLowerCase();
    const filteredData = data.filter((item) => {
        const tags = (item.etiquetas || "").toLowerCase().split(" ");
        const titleText = item.titulo.toLowerCase();

        const chipsMatch = chips.every((chip) => tags.includes(chip));

        const inputMatch =
            !lowerInput || titleText.includes(lowerInput) || tags.some((t) => t.includes(lowerInput));

        return chipsMatch && inputMatch;
    });

    return (
        <section className="index flex flex-col px-5 py-9 rounded-2xl bg-lime-400/10 border-2 border-lime-300/30">
            <h2 className="text-4xl font-bold mb-3 text-(--text-green)">{title}</h2>

            <div className="w-full relative flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-lime-200">
                <span className="material-symbols-rounded scale-85 text-lime-800/80">search</span>
                {chips.map((chip) => (
                    <span key={chip} className="bg-green-500 text-black px-3 py-1 rounded-full flex items-center gap-1">
                        {chip}
                        <button onClick={() => removeChip(chip)} className="font-bold">
                            x
                        </button>
                    </span>
                ))}
                <input
                    className="flex-1 outline-none bg-transparent p-1"
                    type="text"
                    placeholder="Buscar..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="flex gap-2 mt-4 mb-9 py-2 px-2 justify-center items-center bg-lime-800/40 rounded-2xl">
                <span className="material-symbols-rounded text-sm text-lime-200 text-shadow-lime-700/70 text-shadow-lg pr-1">
                    tag
                </span>
                {tagsType === "radio" ? (
                    <>
                        <button onClick={() => addChip("live")} className="text-sm text-lime-100 border-2 px-2 py-1 rounded-xl border-lime-600/20 bg-lime-900 active:bg-green-900/60 transition-all">Gabba Gabba Live</button>
                        <button onClick={() => addChip("acustico")} className="text-sm text-lime-100 border-2 px-2 py-1 rounded-xl border-lime-600/20 bg-lime-900 active:bg-green-900/60 transition-all">Acústicos</button>
                        <button onClick={() => addChip("especial")} className="text-sm text-lime-100 border-2 px-2 py-1 rounded-xl border-lime-600/20 bg-lime-900 active:bg-green-900/60 transition-all">Especiales</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => addChip("cobertura")} className="text-sm text-lime-100 border-2 px-2 py-1 rounded-xl border-lime-600/20 bg-lime-900 active:bg-green-900/60 transition-all">Coberturas</button>
                        <button onClick={() => addChip("resumen")} className="text-sm text-lime-100 border-2 px-2 py-1 rounded-xl border-lime-600/20 bg-lime-900 active:bg-green-900/60 transition-all">Resúmenes</button>
                    </>
                )}
            </div>

            <div className="video-scroll-wrapper relative w-full">
                <div className="video-scroll flex gap-4 overflow-x-auto pb-6 scroll-smooth snap-x">
                    {filteredData.map((item, index) => (
                        <div
                            key={index}
                            className={`video-item flex-none w-75 snap-center relative ${item.destacado ? "featured" : ""}`}
                        >
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={item.imagen}
                                    alt={item.titulo}
                                    className="rounded-xl border-2 border-amber-300 w-full transition-transform duration-300 relative carousel-image"
                                />
                            </a>
                            <span className="video-title mt-2 block text-center text-slate-50">{item.titulo}</span>
                            <span className="absolute bg-black/80 text-white py-0.5 px-1 rounded text-sm carousel-badge">{item.duracion}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Carousel;
