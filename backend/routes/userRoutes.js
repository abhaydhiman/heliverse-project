const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Team = require('../models/Team');
const { v4: uuidv4 } = require('uuid');

// GET /api/users route with pagination support
router.get('/api/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search ? req.query.search.trim() : null;
        const domain = req.query.domain ? req.query.domain.trim() : null;
        const gender = req.query.gender ? req.query.gender.trim() : null;
        const available = req.query.available === 'true' ? true : req.query.available === 'false' ? false : null;

        const query = {};
        if (domain) query.domain = domain;
        if (gender) {
            const genderRegex = new RegExp(`^(${gender})$`, 'i');
            query.gender = genderRegex;
        }
        if (available !== null) query.available = available;
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { first_name: searchRegex },
                { last_name: searchRegex },
                { email: searchRegex },
            ];
        }

        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments(query);

        const users = await User.find(query)
            .skip(skip)
            .limit(limit)
            .exec();

        res.json({
            totalUsers,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            users,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});


// GET /api/users/:id route to retrieve a specific user by ID
router.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
});

// POST /api/users route to create a new user
router.post('/api/users', async (req, res) => {
    try {
        const { id, first_name, last_name, email, gender, avatar, domain, available } = req.body;

        const newUser = new User({
            id,
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available,
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// PUT /api/users/:id route to update an existing user
router.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.gender = req.body.gender;
        user.avatar = req.body.avatar;
        user.domain = req.body.domain;
        user.available = req.body.available;

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// DELETE /api/users/:id route to delete a user
router.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});


// POST /api/team route to create a new team by selecting users from the list with unique domains and availability
router.post('/api/team', async (req, res) => {
    try {
        const { selectedUsers } = req.body;

        if (!Array.isArray(selectedUsers) || selectedUsers.length === 0) {
            return res.status(400).json({ message: 'Selected users must be an array and cannot be empty' });
        }

        const uniqueDomains = new Set();
        let allAvailable = true;

        for (const userId of selectedUsers) {
            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: `User with ID ${userId} not found` });
            }

            if (uniqueDomains.has(user.domain)) {
                return res.status(400).json({ message: `Multiple users with domain "${user.domain}" selected` });
            }

            if (!user.available) {
                allAvailable = false;
            }

            uniqueDomains.add(user.domain);
        }

        if (!allAvailable) {
            return res.status(400).json({ message: 'One or more selected users are not available' });
        }

        const teamId = uuidv4();

        const newTeam = new Team({ teamId, members: selectedUsers });

        await newTeam.save()
        .then((teamRes)=>(console.log(teamRes)))
        .catch((err)=> (console.log(err)));


        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
});

// GET /api/team/:id route to retrieve details of a specific team by its ID
router.get('/api/team/:id', async (req, res) => {
    const teamId = req.params.id;

    try {
        const team = await Team.findOne({ teamId }).populate('members');

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving team', error });
    }
});

// API route to fetch domain options
router.get('/api/domains', async (req, res) => {
    try {
        const domainOptions = await User.distinct('domain');
        res.json({ domainOptions });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving domain options', error });
    }
});

module.exports = router;
