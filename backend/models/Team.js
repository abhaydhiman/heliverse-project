const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: { type: String, required: true},
    members: [{ type: Number }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;