// const { Client } = require("pg");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('medical', 'viviviviviid', 'wlqwnd')


const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  testDbConnection()

// const client = new Client({
//   user: "viviviviviid",
//   host: "127.0.0.1",
//   database: "medical",
//   password: "wlqwnd",
//   port: 5432,
// });

// client.connect(); // DB 접속



// const query = {
//     text: "INSERT INTO member VALUES ($1, $2, $3, $4)",
//     values: [2, "홍길동", "male", "1997-07-23"],
//   };


// client
//   .query(query)
//   .then((res) => {
//     console.log(res.rows[0]);
//     client.end();
//   })
//   .catch((e) => console.error(e.stack));
