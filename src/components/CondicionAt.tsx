import { useEffect, useState } from "react";
import imageSolecito from '../assets/images/soleado.png';
import imageNublado from '../assets/images/nublado.png';
import imageTormentasDispersas from '../assets/images/tormentas-dispersas.png';
import imageTormentas from '../assets/images/tormentas.png';
import imageMayormenteSoleado from '../assets/images/mayormente-soleado.png';
import imageMayormenteNublado from '../assets/images/mayormente-nublado.png';

function CondicionAt() {
    const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
    const states = [
        { id: 1, name: "Aguascalientes" },
        { id: 2, name: "Baja California" },
        { id: 3, name: "Baja California Sur" },
        { id: 4, name: "Campeche" },
        { id: 5, name: "Chiapas" },
        { id: 6, name: "Chihuahua" },
        { id: 7, name: "Ciudad de México" },
        { id: 8, name: "Coahuila" },
        { id: 9, name: "Colima" },
        { id: 10, name: "Durango" },
        { id: 11, name: "Guanajuato" },
        { id: 12, name: "Guerrero" },
        { id: 13, name: "Hidalgo" },
        { id: 14, name: "Jalisco" },
        { id: 15, name: "Estado de México" },
        { id: 16, name: "Michoacán" },
        { id: 17, name: "Morelos" },
        { id: 18, name: "Nayarit" },
        { id: 19, name: "Nuevo León" },
        { id: 20, name: "Oaxaca" },
        { id: 21, name: "Puebla" },
        { id: 22, name: "Querétaro" },
        { id: 23, name: "Quintana Roo" },
        { id: 24, name: "San Luis Potosí" },
        { id: 25, name: "Sinaloa" },
        { id: 26, name: "Sonora" },
        { id: 27, name: "Tabasco" },
        { id: 28, name: "Tamaulipas" },
        { id: 29, name: "Tlaxcala" },
        { id: 30, name: "Veracruz" },
        { id: 31, name: "Yucatán" },
        { id: 32, name: "Zacatecas" },
    ];

    const [data, setData] = useState([]);
    const [state, setState] = useState("Quintana Roo");

    const consultData = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((condicionAtm) => setData(condicionAtm.results));
    };

    useEffect(() => {
        consultData();
    }, []);

    const getImageForWeather = (description) => {
        const lowerDescription = description.toLowerCase().trim();
    
        if (lowerDescription.includes("mayormente soleado")) {
            return imageMayormenteSoleado;
        } else if (lowerDescription.includes("mayormente nublado")) {
            return imageMayormenteNublado;
        } else if (lowerDescription.includes("soleado")) {
            return imageSolecito;
        } else if (lowerDescription.includes("tormentas dispersas")) {
            return imageTormentasDispersas;
        } else if (lowerDescription.includes("tormentas")) {
            return imageTormentas;
        } else if (lowerDescription.includes("nublado")) {
            return imageNublado;
        }
        return null;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-800">
            <nav className="py-4 px-10 flex items-center gap-x-4 bg-slate-900 shadow-lg fixed top-0 left-0 right-0">
                <img src={imageSolecito} alt="solecito" className="h-12 w-12 mr-3" />
                <h2 className="text-white text-xl font-bold">Condición Atmosférica</h2>
            </nav>
            <main className="flex flex-col min-h-screen items-center p-8 text-center mt-20">
                <div className="mb-8">
                    <h1 className="text-white font-semibold text-2xl mb-5">Estado: {state || "Selecciona un estado"}</h1>
                    <select
                        className="bg-gray-700 text-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setState(e.target.value)}
                    >
                        <option value="">Selecciona una opción</option>
                        {states.map((opcion) => (
                            <option key={opcion.id} value={opcion.name}>
                                {opcion.name}
                            </option>
                        ))}
                    </select>
                </div>
                <h2 className="mb-4 mt-5 text-white font-medium">Ciudades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data
                        .filter((city) => city.state === state)
                        .map((city, index) => {
                            const weatherImage = getImageForWeather(city.skydescriptionlong);
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col bg-gray-700 items-center rounded-lg shadow-lg p-6 border border-gray-600"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-3">{city.name}</h2>
                                    {weatherImage && (
                                        <img
                                            src={weatherImage}
                                            alt="Weather"
                                            className="h-12 object-cover mb-4 rounded-md"
                                        />
                                    )}
                                    <p className="text-gray-300">{city.skydescriptionlong}</p>
                                    <p className="text-gray-300">Temperatura: {city.tempc}°C</p>
                                </div>
                            );
                        })}
                </div>
            </main>
            <footer className="flex flex-col min-h-1 mt-4 items-center bottom-0 left-0 right-0 bg-slate-900">
                <p className="py-3 text-white font-light text-xs">Hecho por Celeste González - SM41</p>
            </footer>
        </div>
    );
}

export default CondicionAt;
