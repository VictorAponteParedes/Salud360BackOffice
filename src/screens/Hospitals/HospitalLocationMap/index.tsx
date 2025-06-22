import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configuración de íconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface HospitalLocationMapProps {
    onChange: (lat: number, lng: number) => void;
    defaultPosition?: [number, number];
    initialPosition?: [number, number];
}

const HospitalLocationMap = ({
    onChange,
    defaultPosition = [-25.263739, -57.575926],
    initialPosition
}: HospitalLocationMapProps) => {
    const [position, setPosition] = useState<[number, number]>(initialPosition || defaultPosition);

    // Componente para manejar los eventos del mapa
    const MapClickHandler = () => {
        const map = useMap();

        // Centrar el mapa en la posición inicial
        useEffect(() => {
            if (initialPosition) {
                setPosition(initialPosition);
                map.flyTo(initialPosition, map.getZoom());
            } else {
                map.flyTo(position, map.getZoom());
            }
        }, [initialPosition, map]);

        // Manejador de clicks en el mapa
        useEffect(() => {
            const handleClick = (e: L.LeafletMouseEvent) => {
                const { lat, lng } = e.latlng;
                const newPos: [number, number] = [lat, lng];
                setPosition(newPos);
                onChange(lat, lng);
                map.flyTo(newPos, map.getZoom());
            };

            map.on('click', handleClick);

            return () => {
                map.off('click', handleClick);
            };
        }, [map, onChange]);

        return null;
    };

    // Actualizar posición cuando cambia initialPosition desde fuera
    useEffect(() => {
        if (initialPosition) {
            setPosition(initialPosition);
        }
    }, [initialPosition]);

    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                doubleClickZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler />
                {position && (
                    <Marker position={position}>
                        <Popup>Ubicación seleccionada</Popup>
                    </Marker>
                )}
            </MapContainer>
            <div className="mt-2 text-sm text-gray-500">
                Haga click en el mapa para seleccionar la ubicación exacta
            </div>
        </div>
    );
};

export default HospitalLocationMap;