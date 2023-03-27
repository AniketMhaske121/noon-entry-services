const noonReportParameter=require("../../../configured-jsons/noonParameters.json")

exports.fetchjson = async (req, res) => {
    try {
    res.send(noonReportParameter)
    } catch (error) {
        res.status(500).json({
            error: "erro occures while fetching noon parameter json", //Database connection error
        });
    }
}