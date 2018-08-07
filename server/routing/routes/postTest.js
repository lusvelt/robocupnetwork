const postTest = (req, res) => {
    const stringa = req.body.stringa;
    res.send('<h1>Il server funziona correttamente</h1><br>' + stringa);
};

module.exports = postTest;