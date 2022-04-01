const JWT = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const CreateTokenUserId = (id) => {
    return JWT.sign({id}, 'Net CS', {expiresIn: maxAge})
}
const CreateTokenUserName = (username) => {
    return JWT.sign({username}, 'Net CS', {expiresIn: maxAge})
}
module.exports = { maxAge, CreateTokenUserId, CreateTokenUserName }