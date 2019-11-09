const jwt = require('jsonwebtoken');
const SECRET = 'fangyong';
export function login() {
    let payload = {
        username: 'fang',
        role: ['user']
    }

    const token = jwt.sign(payload, SECRET, { algorithm: 'HS256', expiresIn: 3600 });
    const data = {
        token,
        status: 200
    }
    return data;
}

export function getUserInfo() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhbmciLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNTczMjAzMTQyLCJleHAiOjE1NzMyMDY3NDJ9.61BCo-e8-2KnkyaJrAHtRHoa4gW9pjY1tQgIfVerBeo';
    let data = null;
    jwt.verify(token, SECRET, (err, decoded) => {
        data = {
            username: 'fang',
            role: ['admin']
        }
    })
    return data;
}