const jwt = require('jwt-then');

module.exports = async (req, res, next) => {
  try {
    console.log('############### AUTH MIDDLA');
    console.log(req.headers);
    if (!req.headers.authorization) throw 'Forbidden!!';
    const {config} = global;
    const [,token] = req.headers.authorization.split(' ');
    const payload = await jwt.verify(token, config.secret);

    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Forbidden 🚫🚫🚫',
    });
  }
};
