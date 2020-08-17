const config = require('../../../../config/config');

module.exports = async (req, res) => {
  console.log('### LOGIN');
  try {
    const uuid = require('uuid/v1');
    const dbName = process.env.DB_NAME || config.getValue('db').connection.table || 'Questions';
    const value = req.body.value || req.query.value,
      isAdmin = req.body.isAdmin || req.query.isAdmin;

    if (isAdmin) {
      const pswd = hash(value, config.getValue('salt'));
      const query = value ? { pass: pswd } : {};
      const cl = global.dbClient;
      const db = cl.db(dbName);
      const result = await db.collection('users').findOne(query);

      if(result) {
        req.session.userID = uuid();
        req.session.isAdmin = isAdmin;
        req.session.user = result.username;
        res.json({
          status: 1,
          data: {
            result
          }
        });
      } else {
        res.json({
          status: 0,
          description: 'Wrong credentials'
        });
      }
    } else {
      req.session.userID = uuid();
      req.session.user = value;
      req.session.isAdmin = isAdmin;
      res.json({
        status: 1,
        description: 'OK'
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: -1,
      err: err
    });
  }
};

function hash(text, salt = '') {
  return require('crypto')
    .createHash(config.getValue('hash').encryptionType)
    .update(salt + text)
    .digest('hex');
}