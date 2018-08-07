const getTest = (req, res) => {
    const stringa = req.query.stringa;
    res.send('<h1>Il server funziona correttamente</h1><br>' + stringa);
};

module.exports = getTest;