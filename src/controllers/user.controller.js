const followsModel = require("../model/follows.model")
const userModel = require("../model/user.model")

async function userSendRequest(req, res) {
    try {
        const followerId = req.user.id; // better than username
        const followeeUsername = req.params.username;

        // Prevent self-follow
        if (req.user.username === followeeUsername) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        // Get followee user
        const followee = await userModel.findOne({
            username: followeeUsername
        });

        if (!followee) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if already following
        const alreadyFollowing = await followsModel.findOne({
            follower: followerId,
            followee: followee._id
        });

        if (alreadyFollowing) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }

        // Create follow
        const followSuccess = await followsModel.create({
            follower: followerId,
            followee: followee._id
        });

        return res.status(201).json({
            message: "Successfully followed",
            followSuccess
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}
async function userResponseController(req, res) {
    try {
        const followId = req.params.followid;
        const { response } = req.body;

        // Validate response
        if (!["accepted", "rejected"].includes(response)) {
            return res.status(400).json({
                message: "Invalid response type"
            });
        }

        const follow = await followsModel.findById(followId);

        if (!follow) {
            return res.status(404).json({
                message: "Follow request not found"
            });
        }

        // Check if logged-in user is the followee
        if (follow.followee!==req.user.username) {
            return res.status(403).json({
                message: "You are not authorized to respond"
            });
        }

        follow.status = response;
        await follow.save();

        return res.status(200).json({
            message: `Successfully ${response} the request`
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

module.exports = { userSendRequest,userResponseController }