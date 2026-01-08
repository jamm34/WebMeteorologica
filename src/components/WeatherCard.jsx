import {
    WiThermometer,
    WiHumidity,
    WiBarometer,
} from "react-icons/wi";

const icons = {
    temperature: <WiThermometer size={48} className="text-red-500" />,
    humidity: <WiHumidity size={48} className="text-blue-500" />,
    pressure: <WiBarometer size={48} className="text-green-500" />,
};

export default function WeatherCard({ type, label, value, unit }) {
    return (
        <div className="bg-blue-100 rounded-xl shadow-md p-6 flex items-center gap-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            {icons[type]}
            <div>
                <p className="text-gray-500">{label}</p>
                <p className="text-3xl font-bold">
                    {value ?? "--"} <span className="text-lg">{unit}</span>
                </p>
            </div>
        </div>
    );
}
