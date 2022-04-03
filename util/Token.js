const JWT = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const TokenUserId = (id) =>{
    return JWT.sign({id}, 'Net Cs', {expiresIn: maxAge})
}

module.exports = TokenUserId