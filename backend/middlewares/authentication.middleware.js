var jwt = require('jsonwebtoken');
const authentication = async (req, res, next) => {
  const userToken = req.headers.authorization.split(' ')[1];
  // console.log(userToken)
  if (!userToken) {
    return res.send({ messsage: "Invalid Token" });
  }
  try {
      jwt.verify(userToken, "json_secret", function (err, decoded) {
        if (err) {
            return res.send({ messsage: "error while token verification" });
          }
          const userId = decoded.userId;
          // console.log(decoded)
        req.userId = userId;
        next();
    });
  } catch (error) {
    console.log(error);
    res.send({ messsage: "error while token verification" });
  }
};

module.exports = authentication