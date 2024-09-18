/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, TextField, Select, MenuItem, Box, Typography } from '@mui/material';
import React, { useEffect, useRef,useState  } from 'react';
import { OlaMaps } from '@/olaSDK/olamaps-js-sdk.es';
interface Asset {
    id: string;
    type: string;
    latitude: number;
    longitude: number;
    installationDate: string;
    manufacturer: string;
    model: string;
    capacity: string;
    condition: string;
}

const GISAssetManagement: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const olaMapsRef = useRef<OlaMaps | null>(null);
    const myMapRef = useRef<any>(null);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    useEffect(() => {
        if (!olaMapsRef.current && mapContainerRef.current ) {
            olaMapsRef.current = new OlaMaps({
                apiKey: process.env.NEXT_PUBLIC_OLA_API_KEY,
            });

            myMapRef.current = olaMapsRef.current.init({
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                container: mapContainerRef.current,
                center: [77.2881183,28.690229   ],
                zoom: 16,
            });

            if (myMapRef.current) {
                assets.forEach((asset) => {
                    const popup = olaMapsRef.current!.addPopup({ offset: [0, -30], anchor: 'bottom' })
                        .setHTML(`<div class="font-semibold text-xl">${asset}</div>`);

                    olaMapsRef.current!
                        .addMarker({ offset: [0, 6], anchor: 'bottom', color: 'red' })
                        .setLngLat([asset.longitude, asset.latitude])
                        .addTo(myMapRef.current)
                        .setPopup(popup);
                });
            }
        }   
    });

    const handleAddAsset = (newAsset: Asset) => {
        setAssets([...assets, newAsset]);
    };

    const handleUpdateAsset = (updatedAsset: Asset) => {
        setAssets(assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
    };

    return (
        <Box sx={{ p: 4, minHeight: '100vh', py: 16, mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 'md', width: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>GIS-based Asset Management</Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                    <Box sx={{ height: 400 }}>
                        {/* <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {assets.map(asset => (
                                <Marker
                                    key={asset.id}
                                    position={[asset.latitude, asset.longitude]}
                                    eventHandlers={{
                                        click: () => setSelectedAsset(asset),
                                    }}
                                >
                                    <Popup>{asset.type}</Popup>
                                </Marker>
                            ))}
                        </MapContainer> */}
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                            <div ref={mapContainerRef} className="w-full h-[600px]" />
                        </div>
                    </Box>

                    <Box>
                        <Typography variant="h5" sx={{ mb: 2 }}>Asset Details</Typography>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectedAsset ? handleUpdateAsset(selectedAsset) : handleAddAsset(selectedAsset as unknown as Asset);
                        }}>
                            <TextField
                                label="Asset ID"
                                value={selectedAsset?.id || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, id: e.target.value } as Asset)}
                                fullWidth
                                margin="normal"
                            />
                            <Select
                                label="Asset Type"
                                value={selectedAsset?.type || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, type: e.target.value } as Asset)}
                                fullWidth
                                margin="dense"
                            >
                                <MenuItem value="Pump">Pump</MenuItem>
                                <MenuItem value="Pipeline">Pipeline</MenuItem>
                                <MenuItem value="Valve">Valve</MenuItem>
                                <MenuItem value="Treatment Plant">Treatment Plant</MenuItem>
                            </Select>
                            <TextField
                                label="Latitude"
                                type="number"
                                value={selectedAsset?.latitude || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, latitude: parseFloat(e.target.value) } as Asset)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Longitude"
                                type="number"
                                value={selectedAsset?.longitude || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, longitude: parseFloat(e.target.value) } as Asset)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Installation Date"
                                type="date"
                                value={selectedAsset?.installationDate || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, installationDate: e.target.value } as Asset)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Manufacturer"
                                value={selectedAsset?.manufacturer || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, manufacturer: e.target.value } as Asset)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Model"
                                value={selectedAsset?.model || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, model: e.target.value } as Asset)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Capacity"
                                value={selectedAsset?.capacity || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, capacity: e.target.value } as Asset)}
                                fullWidth
                                margin="normal"
                            />
                            <Select
                                label="Condition"
                                value={selectedAsset?.condition || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, condition: e.target.value } as Asset)}
                                fullWidth
                                margin="dense"
                            >
                                <MenuItem value="Excellent">Excellent</MenuItem>
                                <MenuItem value="Good">Good</MenuItem>
                                <MenuItem value="Fair">Fair</MenuItem>
                                <MenuItem value="Poor">Poor</MenuItem>
                            </Select>
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                {selectedAsset ? 'Update Asset' : 'Add Asset'}
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default GISAssetManagement;