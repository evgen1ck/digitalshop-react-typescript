import { RowBlock } from "./PageBlocks";
import { Link } from "react-router-dom";

interface GameCardProps {
    photo: string;
    link: string;
    name: string;
    desc: string;
    defaultPrice: string;
    discount?: string;
    expiresAt?: Date;
}

const GameCard = ({photo, link, name, desc, defaultPrice}: GameCardProps) => {
    return (
        <RowBlock>
            <Link to={`/game/${link}`} className="flex justify-center bg-light-additional dark:bg-dark-additional hover:hover:-translate-y-1.5 system-animation">
                <div className="flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max">
                    <img className="h-2/5 w-full rounded-t-lg object-cover md:h-auto md:w-2/5 md:rounded-none md:rounded-l-lg hover:card-zoom-image select-none"
                         src={`${photo}`}
                         alt={`${link.replace('-', ' ')}`}/>
                    <div className="flex flex-col justify-start px-6 py-4">
                        <h1 className="mb-2 text-3xl font-bold uppercase">
                            {`${name}`}
                        </h1>
                        <p className="mb-4 text-base text-justify leading-tight xl:line-clamp-6  lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                            {`${desc}`}
                        </p>
                        <p className="text-base">от <b className="text-error border-solid border-b-2 ">{`${defaultPrice}`} ₽</b></p>
                    </div>
                </div>
            </Link>
        </RowBlock>
    )
}

export default GameCard;