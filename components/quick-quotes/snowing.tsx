import Snow from "@assets/quick-quotes/snowflakes.png";
import Image from 'next/image';

const QQSnowing = ({ theme }) => {
    return (
        <>
            {
                theme == "christmas" ?
                    Array.from(Array(40).keys()).map((e: any, index: number) => {
                        let left = Math.random() * 100;
                        let top = Math.floor(Math.random() * 95);
                        return <div key={index} className="qq-chrismas-snow" style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${1 + Math.random()}s` }}>
                            <Image src={Snow} alt="snow" height={Math.floor(Math.random()) * 40} width={Math.floor(Math.random()) * 40} />
                        </div>
                    }) : null
            }
        </>
    )
}

export default QQSnowing