function getToken(header) {
    const bearer = header.split(' ');
    if (bearer.length < 2) 
        throw new Error('invalid token');
    
    const token = bearer[1];
    return token;
}

function isTokenPresentInHeader(req) {
    const header = req.headers.authorization;
    if (! header) 
        throw new Error('no token provided.');
    
    return header;
}

const authenticateUser = (req, res, next) => {
    try { // Check if a token is included in the request headers
        const header = isTokenPresentInHeader(req);
        const token = getToken(header);

        if (token === process.env.API_TOKEN) {
            next();
        } else {
            throw new Error("Invalid Token")
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(403).json({code: '000UN', message: error});
    }
};

module.exports = {
    authenticateUser
};
