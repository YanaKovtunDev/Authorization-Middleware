const ROLES_FILE = __dirname + '/roles.txt';
const fs = require('fs');


module.exports = (scope) => (req, res, next) => {
    try {
        const role = req.headers["x-role"];
        if(!role) {
            return res.status(403).json({message: "Role not found"})
        }

        const rolesData = fs.readFileSync(ROLES_FILE, { encoding: 'utf-8' });
        const cleanJSONString = rolesData.replace(/\s+/g, '');

        const roles = JSON.parse(cleanJSONString);
        const foundedRole = roles.find((item) => item.role === role)

        if(!foundedRole) {
            return res.status(403).json({message: "Role not found"})
        }
        const scopeName = scope.split(".");
        const foundedScopeName = foundedRole.scopes[scopeName[0]];

        if(!foundedScopeName || !foundedScopeName.includes(scopeName[1])) {
            return res.status(403).json({message: "Scope not found"})
        }
        next()
    } catch(e) {
        return res.status(408).json({message: e.message})
    }
};
