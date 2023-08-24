import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
    width: '100%',
    height: '100%',
};

function MyComponent({ location }) {
    const [center, setCenter] = useState(null);

    // Função para abrir o Google Maps ao clicar no botão
    const handleOpenGoogleMaps = () => {
        if (center) {
            const { lat, lng } = center;
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            window.open(url, '_blank');
        }
    };
    // Função para buscar as coordenadas da cidade a partir do endereço
    useEffect(() => {
        const fetchCityCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        location,
                    )}&key=${googleMapsApiKey}`,
                );
                if (response.ok) {
                    const data = await response.json();
                    const { lat, lng } = data.results[0].geometry.location;
                    setCenter({ lat, lng });
                } else {
                    throw new Error('Failed to fetch city coordinates');
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (location) {
            fetchCityCoordinates();
        }
    }, [location]);

    return (
        <div className="flex h-[460px] w-full flex-col">
            {center && (
                <LoadScript googleMapsApiKey={googleMapsApiKey} >
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                        <Marker position={center} />
                    </GoogleMap>
                </LoadScript>
            )}
            <button className='bg-cyan-700 hover:bg-cyan-600 text-white cursor-pointer rounded-lg mt-4 h-10'
                onClick={handleOpenGoogleMaps} variant="outlined">
                Ver no Google Maps
            </button>
        </div>
    );
}

export default React.memo(MyComponent);
