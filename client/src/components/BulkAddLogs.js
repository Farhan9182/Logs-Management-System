import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {bulkCreateLogsApi} from './services/api';

const BulkAddLogs = () => {
    const navigate = useNavigate();
    const textarea = useRef();
    const [logsData, setLogsData] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = () => {
        setError('');
        const textAreaData = textarea.current.value;
        setLogsData(textAreaData);
    };

    const handleBulkAdd = async () => {
        const textAreaData = textarea.current.value;
        setLogsData(textAreaData);
        // Validate if the input is a valid JSON array
        try {
            setError('');
            const parsedData = JSON.parse(logsData);
            if (Array.isArray(parsedData)) {
                // Verify each object for required fields
                const invalidObjects = parsedData.filter((obj, index) => {
                    return (
                    !obj.level ||
                    !obj.message ||
                    !obj.resourceId ||
                    !obj.timestamp ||
                    !obj.traceId ||
                    !obj.spanId ||
                    !obj.commit ||
                    !(obj.metadata && obj.metadata.parentResourceId)
                    );
                });

                if (invalidObjects.length > 0) {
                    setError(`Required fields missing in objects at indexes: ${invalidObjects.map((obj) => parsedData.indexOf(obj)).join(', ')}`);
                    return;
                }

                const response = await bulkCreateLogsApi(parsedData);
                const responseOk = (response.status >= 200 && response.status <=299);
                if (responseOk) {
                    alert(response.data.message);
                    navigate("/bulkAddLogs");
                } else {
                    setError(response.data.message || 'Error during bulk log addition');
                }
            } else {
                setError('Invalid JSON format. Please provide a valid JSON array.');
            }
        } catch (error) {
            console.error('Error during bulk log addition:', error.message);
            setError(error.message || 'Error during bulk log addition');
        }
    }

    const handleFileChange = async (e) => {
        try {
            setError("");
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const fileContent = event.target.result;
                    setLogsData(fileContent);
                };
    
                reader.readAsText(file);
            } else {
                throw new Error("File not selected");
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Bulk Add Logs</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
            <label className="block mb-2">
                Upload JSON File:
                <input type="file" accept=".json" onChange={handleFileChange} className="ml-2" />
            </label>
        </div>
        <textarea
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Paste JSON array here"
            onChange={handleInputChange}
            onPaste={handleInputChange}
            ref= {textarea}
        ></textarea>
        
        <div className='mt-4'>
            <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={handleBulkAdd}
            >
                Bulk Add Logs
            </button>
        </div>
        </div>
    );
};

export default BulkAddLogs;
