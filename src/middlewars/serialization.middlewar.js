function serialization(req, res) {
    res.json(res.rawResponse);
}

module.exports = serialization;