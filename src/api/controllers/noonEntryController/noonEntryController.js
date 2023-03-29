const noonReportParameter=require("../../../configured-jsons/noonParameters.json")
const noonTypes=require("../../../configured-jsons/reporttype.json")
const client = require("../../../config/config");

exports.fetchjson = async (req, res) => {
    try {
    res.send({noonReportParameter,noonTypes})
    } catch (error) {
        res.status(500).json({
            error: "erro occures while fetching noon parameter json", //Database connection error
        });
    }
}



exports.saveTemplateData = async (req, res) => {
    const { template_type, template_data, created_by, vessel_name, isDefualt } = req.body;

    try {
      
            let query=(`INSERT INTO noonentrytemplatedata (template_type,template_data,created_by,vessel_names, isdefault
                ) VALUES ($1,$2,$3,$4,$5);`, [template_type, template_data, created_by, vessel_name, isDefualt])

            var flag = 1; //Declaring a flag
            client
                .query(`INSERT INTO noonentrytemplatedata (template_type,template_data,created_by,vessel_names, isdefault
            ) VALUES ($1,$2,$3,$4,$5);`, [template_type, template_data, created_by, vessel_name, isDefualt], (err) => {

                    if (err) {
                        flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        })
                    }
                    else {
                        flag = 1;
                        res.status(200).send({ message: 'Template Saved Succesfully' });
                    }
                })
        // }

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

exports.getFormDataByShipName= async (req, res) => {
    const {ship_name,report_type} = req.body
    client.query(`SELECT * FROM noonentrytemplatedata where vessel_names='${ship_name}' and template_type='${report_type}'`, (err, data) => {
        if (err) {
            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
                error: "Database error"
            })
        }
        else {
            flag = 1;
            res.status(200).send({ message: 'Fetched Form Data Succesfully', data: data.rows });
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

            let query=`update noonships set shipname=${ship.ship_name},mapping_name=${ship.mapping_name }`
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

