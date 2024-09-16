
"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AssetsManagement = () => {
    const [asset, setAsset] = useState({ name: '', location: '', installationDate: '' });

    const handleInputChange = (e) => {
        setAsset({ ...asset, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log(asset);
        alert("Asset added successfully!");
    };

    return (
        <Box p={4} className="min-h-screen py-12">
            <Typography variant="h4" gutterBottom>
                Manage Assets
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="name" label="Asset Name" onChange={handleInputChange} fullWidth margin="normal" />
                <TextField name="location" label="Location" onChange={handleInputChange} fullWidth margin="normal" />
                <TextField name="installationDate" label="Installation Date" onChange={handleInputChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Add Asset</Button>
            </form>
        </Box>
    );
};

export default AssetsManagement;
