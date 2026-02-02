function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="pb-25 flex items-center justify-center">
            <span className="text-(--footer-text) text-2xl">© {year} - FIESTA RAMONA</span>
        </footer>
    );
}

export default Footer;