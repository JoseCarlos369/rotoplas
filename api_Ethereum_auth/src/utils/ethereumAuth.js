export const ethereumAuth = (req, res , next) => {

    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorization.split(' ')[1];

    if(token !== process.env.ETHEREUM_AUTH_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}

export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorization.split(' ')[1];

    if(token !== process.env.AUTH_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}


