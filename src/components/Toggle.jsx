function Toggle({ value, onChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={() => onChange(!value)}
            />

            <div className="relative w-11 h-6 bg-neutral-400 rounded-full transition-colors peer-checked:bg-lime-600">
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

export default Toggle;