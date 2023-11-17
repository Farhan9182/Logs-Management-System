const Log = require("../models/logModel");

const createLog = async (req, res) => {
    try {
        const logData = req.body;
        const newLog = new Log(logData);
        await newLog.save();

        res.status(200).send('Log added successfully');
    } catch (error) {
        console.error('Error adding new log:', error);
        res.status(500).json({ message: 'Error adding new log' });
    }
};
const bulkCreateLogs = async (req, res) => {
    try {
        const logsData = req.body;
        await Log.insertMany(logsData);

        res.status(200).send('Logs added successfully');
    } catch (error) {
        console.error('Error bulk create logs:', error);
        res.status(500).json({ message: 'Error bulk create logs' });
    }
};
const getLog = async (req, res) => {
    try {
        const { level, message, resourceId, startTimestamp, endTimestamp, traceId, spanId, commit, parentResourceId, regex } = req.query;

        // Query based on the parameters
        const query = {};

        if (level) query.level = level;
        if (message) {
            query.message = { $regex: ".*"+message+".*", $options: 'i' };
        }
        if (resourceId) query.resourceId = resourceId;
        if (traceId) query.traceId = traceId;
        if (spanId) query.spanId = spanId;
        if (commit) query.commit = commit;
        if (parentResourceId) query['metadata.parentResourceId'] = parentResourceId;

        // Timestamp included in query if required
        if (startTimestamp && endTimestamp) {
            query.timestamp = { $gte: new Date(startTimestamp), $lte: new Date(endTimestamp) };
        } else if (startTimestamp) {
            query.timestamp = { $gte: new Date(startTimestamp) };
        } else if (endTimestamp) {
            query.timestamp = { $lte: new Date(endTimestamp) };
        }

        const filteredLogs = await Log.find(query).exec();

        res.json(filteredLogs);
    } catch (error) {
        console.error('Error getting logs:', error);
        res.status(500).json({ message: 'Error getting logs' });
    }
};

module.exports = {getLog, createLog, bulkCreateLogs};