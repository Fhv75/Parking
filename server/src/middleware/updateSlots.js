function updateSlots(req, res) {
    if (req.method === 'PATCH') {
        req.updateType = 'increase'
    } else if (req.method === 'DELETE') {
        req.updateType = 'decrease'
    }
}
module.exports = updateSlots;
