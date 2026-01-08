import { useState } from 'react';

export default function WeatherTable({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Sort data to show the most recent first
    const sortedData = [...data].sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en));

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const goToNextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Histórico de mediciones
            </h2>

            {/* Table for medium and larger screens */}
            <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp (°C)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humedad (%)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presión (hPa)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentData.map(row => (
                            <tr key={row.id} className="hover:bg-gray-200 transition-colors duration-200 background-blue-100 rounded-xl shadow-md cursor-pointer">
                                <td className=" px-6 py-4 whitespace-nowrap text-gray-700">{new Date(row.creado_en).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.temperatura}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.humedad}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.presion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards for small screens */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {currentData.map(row => (
                    <div key={row.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">Fecha</span>
                            <span className="text-gray-600">{new Date(row.creado_en).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">Temp (°C)</span>
                            <span className="text-gray-600">{row.temperatura}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">Humedad (%)</span>
                            <span className="text-gray-600">{row.humedad}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">Presión (hPa)</span>
                            <span className="text-gray-600">{row.presion}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center items-center">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
