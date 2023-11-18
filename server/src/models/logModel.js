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

// index for full-text search
logSchema.index({
  level: 'text',
  message: 'text',
  resourceId: 'text',
  traceId: 'text',
  spanId: 'text',
  commit: 'text',
  'metadata.parentResourceId': 'text',
});

// index for individual fields
logSchema.index({level: 1});
logSchema.index({message: "text"});
logSchema.index({resourceId: 1});
logSchema.index({traceId: 1});
logSchema.index({spanId: 1});
logSchema.index({commit: 1});
logSchema.index({'metadata.parentResourceId': 1});
logSchema.index({ timestamp: -1 });

const Log = mongoose.model('logs', logSchema);
module.exports = Log;