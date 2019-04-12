const sequelize = require('../config/sequelize');

const ranking = async (req, res) => {
    try {
        const phaseId = req.params.phaseId;
        const ranking = await sequelize.query(` SELECT Teams.name AS team,
                                                          Schools.name AS school,
                                                          AgeRanges.name AS ageRange,
                                                          SUM(Runs.score) AS score,
                                                          COUNT(Runs.id) AS numberOfRuns
                                                    FROM Runs
                                                    INNER JOIN Phases ON Runs.phaseId = Phases.id
                                                    INNER JOIN Teams ON Runs.teamId = Teams.id
                                                    INNER JOIN Schools ON Teams.schoolId = Schools.id
                                                    INNER JOIN AgeRanges ON Teams.agerangeId = AgeRanges.id
                                                    WHERE Phases.id = :phaseId AND Runs.status = 'validated'
                                                    GROUP BY Teams.id
                                                    ORDER BY score DESC;`,
        { replacements: { phaseId }, type: sequelize.QueryTypes.SELECT });
        res.send(ranking);
    } catch (err) {
        res.status(400).send();
    }
};

module.exports = ranking;