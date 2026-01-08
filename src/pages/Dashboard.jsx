import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import WeatherCard from "../components/WeatherCard";
import WeatherTable from "../components/WeatherTable";


export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("api_weatherdata")
                .select("*")
                .order("creado_en", { ascending: false });

            if (!error) setData(data);
        };

        fetchData();
    }, []);



    // Realtime (escucha al ESP)
    useEffect(() => {
        const channel = supabase
            .channel("weather-realtime")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "api_weatherdata",
                },
                (payload) => {
                    console.log("Nuevo dato desde ESP:", payload.new);

                    // Agregar el nuevo dato arriba
                    setData((prev) => [payload.new, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const latest = data[0];

    return (
        <main className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <WeatherCard
                    type="temperature"
                    label="Temperatura"
                    value={latest?.temperatura}
                    unit="°C"
                />
                <WeatherCard
                    type="humidity"
                    label="Humedad"
                    value={latest?.humedad}
                    unit="%"
                />
                <WeatherCard
                    type="pressure"
                    label="Presión"
                    value={latest?.presion}
                    unit="hPa"
                />
            </div>

            <WeatherTable data={data} />
        </main>
    );
}
