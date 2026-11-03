const jwt = require('jsonwebtoken')
const User = require('../Modules/User/model/User')

const requireAuth = (req , res , next)=>{
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({
            message:"unauthanticated"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET || 'YOUR_JWT_SECRET', async (err, decodedPayload) => {
        if (err) {
            return res.status(403).json({ message: 'error' });
        }
        
        try {
            const user = await User.findById(decodedPayload.id, { attributes: ['id', 'isActive'] })
            if (!user || user.isActive === false) {
                return res.status(403).json({ message: 'account suspended' });
            }
        } catch (dbError) {
            return res.status(500).json({ message: dbError.message });
        }

        req.userId = decodedPayload.id; 
        req.roleId = decodedPayload.role;
        
        next();
    });
}

module.exports = requireAuth
