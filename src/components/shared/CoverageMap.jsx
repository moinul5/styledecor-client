import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CoverageMap = () => {
  const centerPosition = [40.7128, -74.0060]; // New York

  const serviceAreas = [
    { id: 1, pos: [40.7128, -74.0060], title: 'Manhattan Hub', desc: 'Main operations and luxury events.' },
    { id: 2, pos: [40.7282, -73.7949], title: 'Queens Branch', desc: 'Corporate and large-scale venues.' },
    { id: 3, pos: [40.6782, -73.9442], title: 'Brooklyn Studio', desc: 'Boutique and artistic setups.' },
  ];

  return (
    <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-base-300 z-0 relative">
      <MapContainer 
        center={centerPosition} 
        zoom={11} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceAreas.map(area => (
          <Marker key={area.id} position={area.pos}>
            <Popup>
              <div className="font-serif">
                <h3 className="font-bold text-primary text-sm m-0">{area.title}</h3>
                <p className="text-xs text-base-content/70 mt-1 mb-0">{area.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
