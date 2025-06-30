const BuyMeACoffee = ({ position = "yourPosition" }) => {
    return (
        <a
            href={import.meta.env.VITE_DONATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed ${position} right-4 z-50 bg-yellow-400 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-yellow-300 transition`}
        >
            <img
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="Buy me a coffee"
                className="w-7 h-7"
            />
        </a>
    );
};

export default BuyMeACoffee;
