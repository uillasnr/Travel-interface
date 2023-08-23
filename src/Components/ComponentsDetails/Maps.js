

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';



const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -23.4837230553292, 
    lng: -46.80522626147561
};

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDFg4EHK-9CaKFqmqqSivcc64Xzi-YEk3M"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    return isLoaded ? (
        <div className="flex h-[460px] w-full flex-col ">
            {center && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    <Marker position={center} />
                </GoogleMap>
            )}
            <button variant="outlined">
                Ver no Google Maps
            </button>
        </div>
    ) : <></>
}

export default React.memo(MyComponent)