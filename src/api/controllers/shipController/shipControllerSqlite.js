const db = require("../../../config/config");

// const ship = {
//   ship_name: "FML",
//   mapping_name: "fml",
//   company_name: "NOVA",
//   registerBy: "Smarts ship user",
//   category: "tanker",
//   registerContry: "india",
//   timestamp: "25-11-2028",
// };

// let flag = 1; //Declaring a flag
// db.run(
//   `INSERT INTO noonships (
//                                 mapping_name,
//                                 shipname,
//                                 company_name,
//                                 register_by,
//                                 category,
//                                 registered_country,
//                                 created_date
//             ) VALUES (?,?,?,?,?,?,?);`,
//   [
//     ship.ship_name,
//     ship.mapping_name,
//     ship.company_name,
//     ship.registerBy,
//     ship.category,
//     ship.registerContry,
//     ship.timestamp,
//   ],
//   (err) => {
//     if (err) {
//       flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
//       console.error(err);
//     } else {
//       flag = 1;
//       console.log("Ship Registered Succesfully");
//     }
//   }
// );

exports.registerShip = async (req, res) => {
  const {
    ship_name,
    mapping_name,
    company_name,
    registerBy,
    category,
    registerContry,
  } = req.body;

  try {
    const data = db.run(
      // `SELECT * FROM noonships WHERE mapping_name = ?;`,
      `SELECT * FROM noonships WHERE mapping_name = ?;`,
      [mapping_name]
    ); //Checking if user already exists
    const arr = data;
    if (Object.keys(data).length !== 0) {
      console.log("if block")
      return res.status(400).json({
        error: "ship already there, No need to register again.",
      
      });
    } else {
      let timestamp = new Date().toISOString();
      const ship = {
        mapping_name,
        ship_name,
        company_name,
        registerBy,
        category,
        registerContry,
        timestamp,
      };

      var flag = 1; //Declaring a flag
      db.run(
        `INSERT INTO noonships (
          mapping_name, 
          shipname,
          company_name, 
          register_by, 
          category,
          registered_country,
          created_date
            ) VALUES (?,?,?,?,?,?,?);`,
        [
          ship.mapping_name,
          ship.ship_name,
          ship.company_name,
          ship.registerBy,
          ship.category,
          ship.registerContry,
          ship.timestamp,
        ],
        (err) => {
          if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            return res.status(500).json({
              error: "Ship Already Exists",
            });
          } else {
            flag = 1;
            res.status(200).send({ message: "Ship Registered Succesfully" });
          }
        }
      );
    }
  } catch (error) {}
};

exports.getAllships = async (req, res) => {
  client.query(`SELECT * FROM noonships ORDER BY vesselid ASC`, (err, data) => {
    if (err) {
      flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
      console.error(err);
      return res.status(500).json({
        error: "Database error",
      });
    } else {
      flag = 1;
      res
        .status(200)
        .send({ message: "Fetched All Ship Succesfully", data: data.rows });
    }
  });
};

exports.getShipById = async (req, res) => {
  const { id } = req.params;
  client.query(`SELECT * FROM noonships where vesselid=${id}`, (err, data) => {
    if (err) {
      flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
      console.error(err);
      return res.status(500).json({
        error: "Database error",
      });
    } else {
      flag = 1;
      res
        .status(200)
        .send({ message: "Fetched Ship Succesfully", data: data.rows });
    }
  });
};

exports.deleteShipById = async (req, res) => {
  const { id } = req.params;
  db.r(`delete FROM noonships where vesselid=${id}`, (err, data) => {
    if (err) {
      flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
      console.error(err);
      return res.status(500).json({
        error: "Database error",
      });
    } else {
      flag = 1;
      res
        .status(200)
        .send({ message: "Delted ship Succesfully", data: data.rows });
    }
  });
};
exports.updateShipById = async (req, res) => {
  const { id } = req.params;

  const {
    ship_name,
    mapping_name,
    company_name,
    registerBy,
    category,
    registerContry,
  } = req.body;

  try {
    let timestamp = new Date().toISOString();
    const ship = {
      ship_name,
      mapping_name,
      company_name,
      registerBy,
      category,
      registerContry,
      timestamp,
    };

    var flag = 1; //Declaring a flag

    let query = `update noonships set shipname=${ship.ship_name},mapping_name=${ship.mapping_name}`;
    client.query(
      `UPDATE noonships set(shipname,mapping_name, company_name, register_by, category,registered_country,created_date
                        ) VALUES ($1,$2,$3,$4,$5,$6,$7) where vesselid=${id} `,
      [
        ship.ship_name,
        ship.mapping_name,
        ship.company_name,
        ship.registerBy,
        ship.category,
        ship.registerContry,
        ship.timestamp,
      ],
      (err) => {
        if (err) {
          flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          res
            .status(200)
            .send({ message: "Ship Updated succefully Succesfully" });
        }
      }
    );
    // }
  } catch (error) {}
};
