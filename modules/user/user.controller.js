const userSchema = require('./user.model');
const fs = require('fs')

exports.addUser = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, profile } = req.body;
        //finding email
        const user = await userSchema.findOne({ email });
        if (user) return res.json({ message: "Email id already used." });
        const addUser = await new userSchema({ first_name, last_name, email, phone, profile });
        await addUser.save((error, data) => {
            if (data) {
                res.json({ data: { _id: data._id, name: data.first_name + " " + data.last_name } });
            } else {
                res.status(400).json({ error: error.message });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.imageUpload = (req, res) => {
    try {
        res.json({ data: req.file })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.deleteOldImages = async (req, res) => {
    try {
        const { images } = req.body;
        if (images) {
            if (fs.existsSync(images)) {
                fs.unlink(images, (err) => {
                    if (err) {
                        return res.status(400).json({ error: err.message })
                    }
                })
                return res.json({ data: "file deleted successfully." })
            }
            res.json({ data: "file not present in folder" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getUsers = (req, res) => {
    try {
        userSchema.find((err, data) => {
            if (err && !data) {
                return res.status(400).json({ error: err.message })
            }
            res.json({ data })
        }).select("first_name last_name email").sort({ "_id": -1 })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getUserById = (req, res) => {
    try {
        userSchema.findById(req.params._id, (err, data) => {
            if (err && !data) {
                return res.status(400).json({ error: err.message })
            }
            res.json({ data })
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        userSchema.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
            if (err && !data) {
                return res.status(400).json({ message: err.message })
            }
            res.json({ data })
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        userSchema.findByIdAndDelete(req.params._id, (err, data) => {
            if (err && !data) {
                return res.status(400).json({ message: err.message })
            }
            res.json({ data })
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}