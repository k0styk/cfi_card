module.exports = (req, res) => {
  console.log('### IS AUTH');
  try {
    if (req.session) {
      if (req.session.user) {
        res.json({
          status: 1,
          description: 'Authenticate',
          data: {
            username: req.session.user
          }
        });
        return;
      }
    }
    res.json({
      status: 0,
      description: 'Non authenticate'
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: -1,
      err: err
    });
  }
};