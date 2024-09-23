import React, { useState } from 'react';
import MapComponent from './MapComponent';
import './App.css'; // CSS dosyasını ekle

interface Location {
    name: string;
    coords: [number, number];
    group: string; // Grup bilgisi
}

const App: React.FC = () => {
    const [locations] = useState<Location[]>([
        { name: 'Ankara', coords: [39.9334, 32.8597], group: 'group1' },
        { name: 'İstanbul', coords: [41.0082, 28.9784], group: 'group1' },
        { name: 'İzmir', coords: [38.4192, 27.1287], group: 'group2' },
        { name: 'Antalya', coords: [36.8969, 30.7133], group: 'group2' },
        { name: 'Trabzon', coords: [41.0015, 39.7178], group: 'group3' },
    ]);

    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

    const groups = Array.from(new Set(locations.map(location => location.group)));

    const filteredLocations = selectedGroup
        ? locations.filter(location => location.group === selectedGroup)
        : locations;

    return (
        <div className="container">
            {/* Sol panel */}
            <div className="left-panel">
                <h2>Sol Panel</h2>
                <ul>
                    {filteredLocations.map((location, index) => (
                        <li key={index}>{location.name} - {location.group}</li>
                    ))}
                </ul>
            </div>
            {/* Orta panel - Harita */}
            <div className="center-panel">
                <MapComponent locations={filteredLocations} />
            </div>
            {/* Sağ panel - Butonlar */}
            <div className="right-panel">
                <h2>Gruplar</h2>
                <button onClick={() => setSelectedGroup(null)}>Tüm Grupları Göster</button>
                {groups.map((group, index) => (
                    <button key={index} onClick={() => setSelectedGroup(group)}>
                        {group}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
