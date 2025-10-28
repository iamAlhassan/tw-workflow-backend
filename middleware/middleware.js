const jwt = require('jsonwebtoken');
const statusCodeInfo = require('../utils/statusCode.json');
const SECRET_KEY = process.env.SECRET_KEY || 'passKey';

const authenticate = (req, res, next) => {
    try {
        let token = req.headers["x-access-token"] || req.headers["authorization"];

        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);

            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(statusCodeInfo.UNAUTHORIZED.statusCode).json({
                        status: statusCodeInfo.UNAUTHORIZED.status,
                        message: "Token is not valid",
                    });
                }
                
                req.headers['id'] = decoded.id;
                req.headers['email'] = decoded.email;
                req.headers['role'] = decoded.role;

                next();
            });
        } else {
            return res.status(statusCodeInfo.UNAUTHORIZED.statusCode).json({
                status: statusCodeInfo.UNAUTHORIZED.status,
                message: "Token is empty",
            });
        }
    } catch (err) {
        return res.status(statusCodeInfo.INTERNAL_SERVER_ERROR.statusCode).json({
            status: statusCodeInfo.INTERNAL_SERVER_ERROR.status,
            message: err.message,
        });
    }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    const userRole = req.headers['role'];

    if (!userRole) {
      return res.status(statusCodeInfo.UNAUTHORIZED.statusCode).json({
        status: statusCodeInfo.UNAUTHORIZED.status,
        message: "Unauthorized"
      });
    }

    if (!roles.includes(userRole)) {
      return res.status(statusCodeInfo.FORBIDDEN.statusCode).json({
        status: statusCodeInfo.FORBIDDEN.status,
        message: "Access forbidden. Insufficient permissions."
      });
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorizeRole
};
