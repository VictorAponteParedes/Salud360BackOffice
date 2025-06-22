import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
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

    // Componente para manejar el marcador arrastrable
    const DraggableMarker = () => {
        const map = useMap();

        // Centrar el mapa en la posición inicial si se proporciona
        useEffect(() => {
            if (initialPosition) {
                setPosition(initialPosition);
                map.flyTo(initialPosition, map.getZoom());
            }
        }, [initialPosition, map]);

        return (
            <Marker
                position={position}
                draggable={true}
                eventHandlers={{
                    dragend: (e) => {
                        const { lat, lng } = e.target.getLatLng();
                        const newPos: [number, number] = [lat, lng];
                        setPosition(newPos);
                        onChange(lat, lng);
                    },
                }}
            />
        );
    };

    // Notificar el cambio de posición inicial
    useEffect(() => {
        if (initialPosition) {
            setPosition(initialPosition);
            onChange(initialPosition[0], initialPosition[1]);
        } else {
            onChange(position[0], position[1]);
        }
    }, []);

    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker />
            </MapContainer>
        </div>
    );
};

export default HospitalLocationMap;