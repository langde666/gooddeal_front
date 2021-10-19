const Logo = ({ noBackground = false }) => (
    <div className="logo d-inline-block d-flex flex-nowrap align-items-end ps-2">
        <h1
            className={
                !noBackground
                    ? 'logo m-0 p-1 bg-primary text-white rounded noselect'
                    : 'logo m-0 p-1 text-primary rounded noselect'
            }
        >
            <span
                className={
                    !noBackground
                        ? 'bg-body text-primary px-1 me-1 rounded-2'
                        : 'bg-primary text-white px-1 me-1 rounded-2'
                }
            >
                Good
            </span>
            DeaL!
        </h1>
    </div>

);

export default Logo;
