const db = require("../../../config/config");
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
                message:err
              });
            } else {
              flag = 1;
              res.status(200).send({ message: "Ship Registered Succesfully" });
            }
          }
        );
      
    } catch (error) {}
  };
exports.getAllships = async (req, res) => {

    db.all(`SELECT * FROM noonships ORDER BY vesselid ASC`, [],(err, row) => {
        if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
                error: "Database error"
            })
        }
        else {
            flag = 1;
            res.status(200).send({ message: 'Fetched All Ship Succesfully', data :row });
        }
    })

}

exports.getShipById = async (req, res) => {
    const { id } = req.params
    db.get(`SELECT * FROM noonships where vesselid= ? `,[id], (err, row) => {
        if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
                error: "Database error"
            })
        }
        else {
            flag = 1;
            res.status(200).send({ message: 'Fetched Ship Succesfully', data: row });
        }
    })

}

exports.deleteShipById = async (req, res) => {
    const { id } = req.params

        if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
                error: "Database error"
            })
        }
        else {
            flag = 1;
            res.status(200).send({ message: 'Delted ship Succesfully', data: data });
        }
    }

exports.updateShipById = async (req, res) => {
    const { id } = req.params

    const { ship_name, mapping_name, company_name, registerBy, category, registerContry } = req.body;

    try {

        let timestamp = new Date().toISOString()
        const ship = {
            ship_name,
            mapping_name,
            company_name,
            registerBy,
            category,
            registerContry,
            timestamp
        };

        var flag = 1; //Declaring a flag

        let query = `UPDATE or Replace noonships set 
                                            shipname = ? ,  
                                            mapping_name = ? , 
                                            company_name = ?, 
                                            register_by = ?, 
                                            category = ?,
                                            registered_country = ?,
                                            created_date = ?
                                        WHERE
                                            vesselid = ?`
        
        db.run(query ,[ship.ship_name, ship.mapping_name, ship.company_name, ship.registerBy, ship.category, ship.registerContry, ship.timestamp,id], function(err){

                if (err) {
                    flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                    console.error(err);
                    return res.status(500).json({
                        error: "Database error"
                    })
                }
                else {
                    flag = 1;
                    res.status(200).send({ message: 'Ship Updated succefully Succesfully' ,UpdatedValue :this.changes});
                }
            })
        // }

    } catch (error) {

    }

}

