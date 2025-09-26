
import { IoMdPhonePortrait } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoIosCode } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";

const gridCards = [
    {
        icon: <IoMdPhonePortrait />,
        title: "Rahgir App",
        description: "Well known and requested personal safety app with comprehensive features",
        features: [
            "Voice activation",
            "Live audio and streaming with recording",
            "Location tracking"
        ],
        iconBg: "bg-blue-200",
        rowSpan: ""
    },
    {
        title: "",
        description: "",
        features: [],
        icon: null,
        iconBg: "",
        rowSpan: "sm:row-span-1 md:row-span-2"
    },
    {
        title: "API Integration",
        description: "Seamless integration with existing systems",
        features: [
            "API package for alarm centers",
            "3rd party system integration",
            "Customized alarms",
            "Sentinel integration",
        ],
        icon: <IoIosCode />,
        iconBg: "bg-blue-200",
        rowSpan: ""
    },
    {
        title: "Monitoring",
        description: "24/7 professional monitoring services",
        features: [
            "24/7 user monitoring",
            "Emergency services connection",
            "Portal system automation",
            "B2B partner handling",
        ],
        icon: <FaShieldAlt />,
        iconBg: "bg-blue-200",
        rowSpan: ""
    },
    {
        title: "Edamame",
        description: "Edamame description here.",
        features: [],
        icon: null,
        iconBg: "bg-blue-200",
        rowSpan: ""
    }
];

const Advanced = () => {
    return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center text-black gap-10 mt-60 md:px-10 mb-50'>
            <div className="w-full flex flex-col items-center gap-6 px-2 md:px-8">
                <h1 className="font-bold text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">Rahgir is probably India's most innovative and advanced mobile safety platform</h1>
                <p className="text-center w-full sm:w-4/5 md:w-3/4 text-base sm:text-lg md:text-xl">A comprehensive platform for integration and branding, offering holistic emergency management solutions developed from real-life incidents and actual user needs.</p>
            </div>

            <div className="flex h-full w-full items-center justify-center">
                <div className="grid w-full max-w-5xl lg:max-w-6xl bg-gray-200 p-2 rounded-lg shadow-md
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
                    auto-rows-[minmax(100px,1fr)] gap-4 sm:gap-6 md:gap-8">
                    {gridCards.map((card, idx) => (
                        <div key={idx} className={`rounded-lg shadow-md flex items-center justify-center ${card.rowSpan} px-2 py-3 sm:px-4 sm:py-5`}> 
                            <div className="flex flex-col w-full">
                                {card.icon && (
                                    <div className={`p-4 ${card.iconBg} rounded-2xl w-12 mb-2 mx-auto`}>{card.icon}</div>
                                )}
                                <h3 className="text-xl font-bold pt-2 text-center">{card.title}</h3>
                                <p className="py-2 text-center">{card.description}</p>
                                {card.features.length > 0 && (
                                    <ul className="pt-2 pb-3">
                                        {card.features.map((feature, fidx) => (
                                            <li key={fidx} className="flex items-center gap-2"><IoCheckmarkDoneSharp /> {feature}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Advanced