const DB = require('../Connection/Connection');

exports.Signup = async (req, res) => {
    try {
        const db = await DB.connectDB();
        const collection = db.collection('users');
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const exists = await collection.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Email Already Exists' });
        }

        const result = await collection.insertOne({ name, email, password });
        res.status(201).json({ message: 'User inserted successfully', data: result });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.GetAllUsers = async (req, res) => {
    try {
        const db = await DB.connectDB();
        const collection = db.collection('users');
        const result = await collection.find().toArray();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.GetSingleUser = async (req, res) => {
    try {
        const db = await DB.connectDB();
        const collection = db.collection('users');
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const result = await collection.findOne({ email });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No User Found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.Update = async (req, res) => {
    try {
        const db = await DB.connectDB();
        const collection = db.collection('users');
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const result = await collection.findOneAndUpdate(
            { email },
            { $set: { password } },
        );

        if (result) {
            res.status(200).json({ message: 'User updated', data: result });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.DeleteUser = async (req, res) => {
    try {
        const db = await DB.connectDB();
        const collection = db.collection('users');
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email required' });
        }

        const result = await collection.findOneAndDelete({ email });
        if (result) {
            res.status(200).json({ message: 'User deleted', data: result });
        } else {
            res.status(404).json({ message: 'Invalid user' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};
