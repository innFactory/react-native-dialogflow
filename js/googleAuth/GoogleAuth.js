var rs = require('jsrsasign');
import postAsForm from './postAsForm';


const encodeJWT = function (options) {

    if (!options) { throw new Error('options is required'); }
    if (!options.email) { throw new Error('options.email is required'); }
    if (!options.scopes) { throw new Error('options.scopes is required'); }
    if (!Array.isArray(options.scopes)) { throw new Error('options.scopes must be an array'); }
    if (options.scopes.length === 0) { throw new Error('options.scopes must contain at least one scope'); }
    if (!options.key) { throw new Error('options.key is required'); }


    var iat = Math.floor(new Date().getTime() / 1000),
        exp = iat + Math.floor((options.expiration || 60 * 60 * 1000) / 1000),
        claims = {
            iss: options.email,
            scope: options.scopes.join(' '),
            aud: 'https://accounts.google.com/o/oauth2/token',
            exp: exp,
            iat: iat,
            sub: null
        };

    if (options.delegationEmail) {
        claims.sub = options.delegationEmail;
    }

    // Sign JWT
    var sHeader = JSON.stringify({ alg: 'RS256', typ: 'JWT' });
    return rs.jws.JWS.sign("RS256", sHeader, JSON.stringify(claims), options.key);
}

const authenticate = async (email, key, scopes) => {

    const json = await postAsForm('https://accounts.google.com/o/oauth2/token',
        {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: encodeJWT({ email, key, scopes })
        });

    return JSON.parse(json).access_token;
}

export default authenticate;