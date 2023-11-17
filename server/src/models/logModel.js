const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    level: String,
    message: String,
    resourceId: String,
    timestamp: Date,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
      parentResourceId: String
    }
}, { collection: 'logs' });

logSchema.index({
  level: 'text',
  message: 'text',
  resourceId: 'text',
  traceId: 'text',
  spanId: 'text',
  commit: 'text',
  'metadata.parentResourceId': 'text',
});

const Log = mongoose.model('logs', logSchema);
module.exports = Log;