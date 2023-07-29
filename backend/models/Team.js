const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: { type: String, required: true},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;