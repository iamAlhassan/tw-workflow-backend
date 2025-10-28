const User = require('../../helpers/mongoSchema/User');
const jwt = require('jsonwebtoken');

async function login(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ email });
            if(user != null && user.password === password){
                const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'passKey', { expiresIn: '1h' });
                resolve({ success: true, token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
            }else{
                reject('Invalid email or password')
            }
            
        } catch (error) {
            console.error('Login error:', error);
            reject("Error while fetching user data")
        }
    })
}

module.exports = login;
