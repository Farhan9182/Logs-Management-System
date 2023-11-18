import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import {createLogApi} from './services/api';

const AddLogs = () => {
    const navigate = useNavigate();
    const textarea = useRef();
    const [error, setError] = useState("");
    const [logData, setLogData] = useState({
        level: '',
        message: '',
        resourceId: '',
        timestamp: '',
        traceId: '',
        spanId: '',
        commit: '',
        parentResourceId: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogData((prevLogData) => ({ ...prevLogData, [name]: value }));
    };

    const handleTextArea = () => {
        setError("");
        const pastedData = textarea.current.value;
        try {
            const parsedLog = JSON.parse(pastedData);
            if (Array.isArray(parsedLog)) throw new Error("Please paste a single log data only else use bulk add option");
            // Autofill form fields with parsed log data
            setLogData({
                level: parsedLog.level || '',
                message: parsedLog.message || '',
                resourceId: parsedLog.resourceId || '',
                timestamp: parsedLog.timestamp || '',
                traceId: parsedLog.traceId || '',
                spanId: parsedLog.spanId || '',
                commit: parsedLog.commit || '',
                parentResourceId: (parsedLog.metadata && parsedLog.metadata.parentResourceId) || '',
            });
        } catch (error) {
            console.error('Error parsing pasted JSON data:', error.message);
            setError('Error parsing pasted JSON data. Please make sure it is a valid JSON object.');
        }
    };
    const handleAddLog = async () => {
        try {
            setError('');
            const response = await createLogApi(logData);
            const responseOk = (response.status >= 200 && response.status <=299);
            if (responseOk) {
                alert(response.data.message);
                navigate("/addLogs");
            } else {
                console.error('Error adding log:', response.data);
                setError(response.data.message || 'Error adding log');
            }
        } catch (error) {
            console.error('Error adding log:', error.message);
            setError(error.message || 'Error adding log');
        }
    };

    return (
        <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Add Logs</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <textarea
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Paste a single log JSON object here"
            ref={textarea}
        ></textarea>
        <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            onClick={handleTextArea}
        >
            AutoFill Log Data
        </button>
        <form>
            <label className="block mb-2">
                Level:
                <input
                    type="text"
                    name="level"
                    value={logData.level}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <label className="block mb-2">
                Message:
                <input
                    type="text"
                    name="message"
                    value={logData.message}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <label className="block mb-2">
                Resource ID:
                <input
                    type="text"
                    name="resourceId"
                    value={logData.resourceId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <label className="block mb-2">
                Timestamp:
                <input
                    type="text"
                    name="timestamp"
                    value={logData.timestamp}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <label className="block mb-2">
                Trace ID:
                <input
                    type="text"
                    name="traceId"
                    value={logData.traceId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <label className="block mb-2">
                Span ID:
                <input
                    type="text"
                    name="spanId"
                    value={logData.spanId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <label className="block mb-2">
                Commit:
                <input
                    type="text"
                    name="commit"
                    value={logData.commit}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <label className="block mb-2">
                ParentResourceId:
                <input
                    type="text"
                    name="parentResourceId"
                    value={logData.parentResourceId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                />
            </label>
            <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddLog}
                >
                Add Log
            </button>
        </form>
        </div>
    );
};

export default AddLogs;
