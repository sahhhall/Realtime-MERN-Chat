const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const authProtect = asyncHandler(async (req, res, next) => {
    console.log("I am in the token middleware");
    console.log(req.headers.authorization);

    let token;

    // Authorization header is present and has the expected format
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
           
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;
            const user = await User.findById(userId).select("-password");
            req.user = user;
            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized - Missing or invalid token" });
    }
});

module.exports = {
    authProtect
};
