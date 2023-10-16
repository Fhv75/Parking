const getDatabaseConnection = require("../db/conn");

class SlotController {
    db;

    constructor() {
        this.db = getDatabaseConnection();
        this.getSlotsDisponibles = this.getSlotsDisponibles.bind(this);
    }

    async getSlotsDisponibles(req, res) {
        try {
           
            const slotsDisponibles = await this.db.slots.findMany({
                where: {
                    status: 'disponible',
                },
            });

            res.status(200).json({ slots: slotsDisponibles });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Error al obtener los slots disponibles', error: error.message });
        }
    }
}

module.exports = SlotController;
