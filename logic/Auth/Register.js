const User = require('../../helpers/mongoSchema/User');
const jwt = require('jsonwebtoken');

async function register(email, password, role, name) {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                reject('Email already registered');
                return;
            }

            const user = new User({ email, password, role, name });
            await user.save();

            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'passKey', { expiresIn: '1h' });
            resolve({ success: true, token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
            
        } catch (error) {
            console.error('Registration error:', error);
            reject("Error while creating user")
        }
    })
}

module.exports = register;
