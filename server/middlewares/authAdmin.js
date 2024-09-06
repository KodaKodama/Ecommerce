const Users = require('../models/userModel');

const authAdmin = async(req, res, next) => {
    try{
        console.log('req.user:', req.user); // Check the structure of req.user
        const user = await Users.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    console.log('User Role:', user.role); // Verify the role value
    if (user.role !== 1) {
      return res.status(400).json({ msg: 'Admin resources denied' });
    }

    next();
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
};

module.exports = authAdmin;