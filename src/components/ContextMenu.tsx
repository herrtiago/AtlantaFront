import { MouseEventHandler, ReactNode, useEffect } from "react";

type ContextMenuProps = {
    x: number,
    y: number,
    setClicked: React.Dispatch<React.SetStateAction<boolean>>,
    className?: string,
    options: {
        icon?: ReactNode
        text: string,
        onClick: MouseEventHandler<HTMLLIElement>
    }[]
}

export const ContextMenu = ({
    x,
    y,
    className,
    setClicked,
    options
}: ContextMenuProps) => {

    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className={`absolute rounded-sm bg-gray-500 box-border shadow-xl ${className}`} style={{
            top: `${y}px`,
            left: `${x}px`
        }}>
            <ul className="w-auto h-auto">
                {
                    options.map((option, i) => (
                        <li
                            key={i}
                            className={`flex felx-col items-center hover:bg-gray-400 py-1 px-4 cursor-pointer ${i == 0 ? "rounded-t-sm" : i == (options.length - 1) ? "rounded-b-sm" : ""} `}
                            onClick={option.onClick}
                        >
                            {
                                option.icon && (
                                    <div className="mr-2">{option.icon}</div>
                                )
                            }
                            {option.text}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}//bg-gray-500 hover:!bg-gray-400