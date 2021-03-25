function serialization(req, res) {
    return res.json(res.rawResponse);
}

module.exports = serialization;