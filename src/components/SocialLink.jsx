function SocialLink({ href, img, name, user }) {
    return (
        <a className="first-of-type:col-span-full flex items-center gap-4 bg-linear-210 from-neutral-950 to-neutral-800  rounded-2xl p-3 border-t border-l border-neutral-700/80 link active:scale-95 transition-all" href={href} target="_blank">
            <img className="w-9" src={img} alt={name} />
            <div className="flex flex-col text-neutral-300">
                <p className="text-xl font-medium">{name}</p>
                <span className="text-sm font-light">{user}</span>
            </div>
        </a>
    );
}

export default SocialLink