const mongoose = require("mongoose");

const Users = require("./models/users.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/salaPlay")
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(err);
  });

const preUsers = [
  {
    name: "admin",
    email: "adminTesting@play.com",
    pass: "$2b$12$w/p1VijBLIpuzu/q4X7k3eGuJhOyKctGTb72TmTmOT3KURoeX7qme",
    type: "Admin",
  },
  {
    name: "andrew",
    email: "andrew@gmail.com",
    pass: "$2b$12$qlXQMNwMVGBHwY7LyQpP4.Ags7Ed9pn85LRr1qt2XdXuKIQvSx8RO",
    type: "User",
  },
];

Users.insertMany(preUsers)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
