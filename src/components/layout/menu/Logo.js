const Logo = ({ noBackground = false }) => (
    <div className="logo d-inline-block d-flex flex-nowrap align-items-end">
        <h1
            className={`logo m-0 noselect rounded ${
                !noBackground ? 'bg-primary text-white' : 'bg-body text-primary'
            }`}
        >
            <span
                className={`px-2 me-1b rounded-2 ${
                    !noBackground
                        ? 'bg-body text-primary'
                        : 'bg-primary text-white'
                }`}
            >
                Good
            </span>
            DeaL!
        </h1>
    </div>
);

export default Logo;
