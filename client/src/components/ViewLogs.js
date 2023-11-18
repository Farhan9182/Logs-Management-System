import React, { useState, useEffect } from 'react';
import {getLogsApi} from './services/api';

const ViewLogs = () => {
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({
        level: '',
        message: '',
        resourceId: '',
        startTimestamp: '',
        endTimestamp:'',
        traceId: '',
        spanId: '',
        commit: '',
        parentResourceId: '',
    });
    const [textSearch, setTextSearch] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            setError('');
            const response = await getLogsApi(buildQueryString(filters, textSearch));
            const responseOk = (response.status >= 200 && response.status <=299);
            if (responseOk) {
                setLogs(response.data);
            } else {
                setError(response.data.message || 'Error fetching logs');
            }
        } catch (error) {
            console.error('Error fetching logs:', error.message);
            setError(error.message || 'Error fetching logs');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleTextSearch = () => {
        fetchLogs();
    };

    const buildQueryString = (filters, textSearch) => {
        const queryString = Object.entries(filters)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => {
            // Convert datetime values to ISO string format
            if (key.includes('Timestamp')) {
                const localDate = new Date(value);
                const offset = localDate.getTimezoneOffset() * 60000;
                const adjustedDate = new Date(localDate.getTime() - offset);
                return `${key}=${adjustedDate.toISOString()}`;
            }
            return `${key}=${value}`;
        })
        .join('&');

        return textSearch !== '' ? `${queryString}&textSearch=${textSearch}` : queryString;
    };

    const handleResetFilters = async () => {
        setFilters({
          level: '',
          message: '',
          resourceId: '',
          startTimestamp: '',
          endTimestamp: '',
          traceId: '',
          spanId: '',
          commit: '',
          parentResourceId: '',
        });
        setTextSearch('');
        await fetchLogs();
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">View Logs</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <h3 className="text-lg font-semibold mb-2">Filters</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4 mb-4">
                <input
                    type="text"
                    name="level"
                    placeholder="Level"
                    value={filters.level}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="message"
                    placeholder="Message"
                    value={filters.message}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="resourceId"
                    placeholder="Resource Id"
                    value={filters.resourceId}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="spanId"
                    placeholder="Span Id"
                    value={filters.spanId}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="traceId"
                    placeholder="Trace Id"
                    value={filters.traceId}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="commit"
                    placeholder="Commit"
                    value={filters.commit}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="parentResourceId"
                    placeholder="Parent Resource Id"
                    value={filters.parentResourceId}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <div>
                </div>
            </div>
            <div className="flex space-x-4">
                <label>
                    Start
                    <input
                    type="datetime-local"
                    name="startTimestamp"
                    value={filters.startTimestamp}
                    onChange={handleInputChange}
                    className="ml-3 p-2 border rounded-md"
                    />
                </label>
                <label>
                    End
                    <input
                    type="datetime-local"
                    name="endTimestamp"
                    value={filters.endTimestamp}
                    onChange={handleInputChange}
                    className="ml-3 p-2 border rounded-md"
                    />
                </label>
            </div>
            <div className="mt-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Text"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    className="p-2 border rounded-md"
                />
                <button
                    type="button"
                    className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    onClick={handleTextSearch}
                >
                    Apply Filters
                </button>
                <button
                    type="button"
                    className="ml-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={handleResetFilters}
                >
                    Reset Filters
                </button>
            </div>
            <div>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Level</th>
                            <th className="border px-4 py-2">Message</th>
                            <th className="border px-4 py-2">Resource ID</th>
                            <th className="border px-4 py-2">Timestamp</th>
                            <th className="border px-4 py-2">Trace ID</th>
                            <th className="border px-4 py-2">Span ID</th>
                            <th className="border px-4 py-2">Commit</th>
                            <th className="border px-4 py-2">Parent Resource ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log._id}>
                                <td className="border px-4 py-2">{log.level}</td>
                                <td className="border px-4 py-2">{log.message}</td>
                                <td className="border px-4 py-2">{log.resourceId}</td>
                                <td className="border px-4 py-2">{log.timestamp}</td>
                                <td className="border px-4 py-2">{log.traceId}</td>
                                <td className="border px-4 py-2">{log.spanId}</td>
                                <td className="border px-4 py-2">{log.commit}</td>
                                <td className="border px-4 py-2">{log.metadata && log.metadata.parentResourceId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewLogs;
