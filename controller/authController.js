const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');

const expireTime = process.env.JWT_EXPIRES || "1h";
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";


// genarate jwt token with user id
const signToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: expireTime,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};


// user sign up
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (password !== password2) {
            res.status(400).json({
                "message": "Two password does not match."
            })
        } else {

            const newUser = await User.create({
                name,
                email,
                // Hash the password with cost of 12
                password: await bcrypt.hash(password, 12),
            });
            createSendToken(newUser, 201, res);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


// get all user 
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).lean().exec();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

// user sign in with email and password
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        var user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(404).json({
                "message": "Couldn't find any user with that email"
            });
        }
        // check password is matched 
        bcrypt.compare(password, user.password, function (err, response) {
            if (response) {
                console.log(user);
                user['password'] = "hided";
                createSendToken(user, 200, res);
            }
            else {
                res.status(401).json({
                    "message": "Password is not correct."
                })
            }
        });

    } catch {
        res.status(500);
    }
}


// profile update
exports.update = async (req, res) => {
    try {
        const authorization = req.headers['authorization'];
        const { email, name } = req.body;
        // if header has authorization
        if (authorization) {
            const token = authorization.split(" ")[1];
            // check token is valid?
            jwt.verify(token, JWT_SECRET, async function (err, decoded) {
                if (!err) {
                    try {
                        const user = await User.findById(decoded.id).exec();
                        // if user provide name and email then set, otherwise set to previous data
                        await user.update(
                            {
                                "name": name ? name : user.name,
                                "email": email ? email : user.email
                            },
                            { new: true }
                        );

                        res.status(200).json({ "message": "Successfully updated" });
                    } catch (e) {
                        console.log(e);
                        if (e.code === 11000) {

                            res.status(400).json({ ...e, "message": "This email is already exist in database, please try with another one" })
                        }
                    }

                } else {
                    res.status(401).json({
                        "message": "You are not authorized"
                    });
                }

            });
        } else {
            res.status(401).json({
                "message": "You are not authorized"
            })
        }

    } catch (e) {
        res.status(500).json(e);
    }
}
