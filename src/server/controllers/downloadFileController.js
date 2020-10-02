const fs = require('fs');
const jwt = require('jwt-then');
const { config } = global;

const checkFileExist = path => fs.existsSync(path);

exports.download = async (req, res) => {
  const file = `${__dirname}\\..\\..\\..\\temp\\${req.params.document}`;
  const session = req.session; // eslint-disable-line

  if(session.userId && session.token) {
    const user = await jwt.verify(session.token, config.secret);

    if(user.rights === 'admin' || user.rights === 'manager') {
      if(checkFileExist(file)) {
        res.download(file);
      } else {
        res.json({
          message: 'File not found',
        });
      }
    } else {
      res.json({
        message: 'Route not found',
      });
    }
  } else {
    res.json({
      message: 'Forbiden, Unauthorized access',
    });
  }
};
