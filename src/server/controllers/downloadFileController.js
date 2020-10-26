const fs = require('fs');
const path = require('path');
const jwt = require('jwt-then');
const { config } = global;

const checkFileExist = location => fs.existsSync(location);

exports.download = async (req, res) => {
  const file = path.join(__dirname, `../../../temp/${req.params.document}`);
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
