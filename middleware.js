const ROLES_FILE = __dirname + '/roles.txt';
const fs = require('fs');


module.exports = (scope) => (req, res, next) => {
 
try {
  const role = req.headers["x-role"];
  if(!role) {
    return res.status(403)
  }
  
  return res.status()
  next()
} catch(e) {
  return res.status(403)
}
};
