import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

const DefaultIcon = new L.Icon({
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const userIcon = L.divIcon({ className: 'user-marker', html: '<div></div>', iconSize: [18,18], iconAnchor:[9,9] })

const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({ click: () => onMapClick?.() })
    return null
}

const MapView = ({ center, items, onMarkerClick, onMapClick }) => {
    const [map, setMap] = useState(null)
    const radius = 5000
    const markers = useMemo(() => items ?? [], [items])

    useEffect(() => { if (map && center) map.setView([center.lat, center.lng], 13) }, [map, center])

    return (
        <MapContainer id="map" center={[center.lat, center.lng]} zoom={13} scrollWheelZoom whenCreated={setMap}>
            <MapClickHandler onMapClick={onMapClick} />
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Circle center={[center.lat, center.lng]} radius={radius} pathOptions={{ color:'#1e88e5', fillColor:'#1e88e5', fillOpacity:.12 }}/>
            <Marker position={[center.lat, center.lng]} icon={userIcon}><Popup>موقعیت فعلی شما</Popup></Marker>
            {markers.map((it) => (
                <Marker key={it.id} position={[it.coords.lat, it.coords.lng]} eventHandlers={{ click: () => onMarkerClick?.(it) }}>
                    <Popup><strong>{it.name}</strong><br/><span style={{ fontSize: 12 }}>{it.address}</span></Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MapView
