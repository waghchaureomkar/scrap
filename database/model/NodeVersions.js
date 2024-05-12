import mongoose from 'mongoose';
const nodeSchema = new mongoose.Schema({
    name: String,
    version: String,
    creation_date: { type: Date, default: Date.now },
    modified_date: { type: Date, default: Date.now }
});

const NodeVs = mongoose.model('NodeVersions', nodeSchema);
export default NodeVs