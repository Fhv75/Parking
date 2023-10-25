function updateSlots(req, res, next) {
    if (req.method === 'PATCH') {
        req.updateType = 'increase'
    } else if (req.method === 'DELETE') {
        req.updateType = 'decrease'
    }
    next()
}
module.exports = updateSlots;
