const client = require("../../../config/config");

exports.registerShip = async (req, res) => {
    const { ship_name, mapping_name, company_name, registerBy, category, registerContry } = req.body;

    try {
        const data = await client.query(`SELECT * FROM noonships WHERE mapping_name= $1;`, [mapping_name]); //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "ship already there, No need to register again.",
            });
        } else {
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
            client
                .query(`INSERT INTO noonships (shipname,mapping_name, company_name, register_by, category,registered_country,created_date
            ) VALUES ($1,$2,$3,$4,$5,$6,$7);`, [ship.ship_name, ship.mapping_name, ship.company_name, ship.registerBy, ship.category, ship.registerContry, ship.timestamp], (err) => {

                    if (err) {
                        flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        })
                    }
                    else {
                        flag = 1;
                        res.status(200).send({ message: 'Ship Registered Succesfully' });
                    }
                })
        }

    } catch (error) {

    }

}

exports.getAllships = async (req, res) => {

    client.query(`SELECT * FROM noonships ORDER BY vesselid ASC`, (err, data) => {
        if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
                error: "Database error"
            })
        }
        else {
            flag = 1;
            res.status(200).send({ message: 'Fetched All Ship Succesfully', data: data.rows });
        }
    })

}

exports.getShipById = async (req, res) => {
    const { id } = req.params
    client.query(`SELECT * FROM noonships where vesselid=${id}`, (err, data) => {
        if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
                error: "Database error"
            })
        }
        else {
            flag = 1;
            res.status(200).send({ message: 'Fetched Ship Succesfully', data: data.rows });
        }
    })

}

exports.deleteShipById = async (req, res) => {
    const { id } = req.params
    client.query(`delete FROM noonships where vesselid=${id}`, (err, data) => {
        if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
                error: "Database error"
            })
        }
        else {
            flag = 1;
            res.status(200).send({ message: 'Delted ship Succesfully', data: data.rows });
        }
    })

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

        let query = `update noonships set shipname=${ship.ship_name},mapping_name=${ship.mapping_name}`
        client
            .query(`UPDATE noonships set(shipname,mapping_name, company_name, register_by, category,registered_country,created_date
                        ) VALUES ($1,$2,$3,$4,$5,$6,$7) where vesselid=${id} `, [ship.ship_name, ship.mapping_name, ship.company_name, ship.registerBy, ship.category, ship.registerContry, ship.timestamp], (err) => {

                if (err) {
                    flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                    console.error(err);
                    return res.status(500).json({
                        error: "Database error"
                    })
                }
                else {
                    flag = 1;
                    res.status(200).send({ message: 'Ship Updated succefully Succesfully' });
                }
            })
        // }

    } catch (error) {

    }

}

