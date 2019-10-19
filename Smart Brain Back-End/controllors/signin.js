const handleSignin = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Please fill both fields..!");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      //   = req.body.password === data[0].hash ? true : false;
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .returning("*")
          .then(user => {
            // msg = "success";
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unable to getting user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch(err => {
      res.status(400).json("wrong credentials");
    });
};

module.exports = { handleSignin: handleSignin };
