module.exports = (req, res) => {
  console.log('### LOGOUT');
  req.session.destroy();
  res.json({
    status: 1
  });
};