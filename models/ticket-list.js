const Ticket = require("./ticket");

class TicketList {

    constructor() {
        this.ultimoNumero = 0;

        this.pendientes = [];
        this.asignados = [];
    }

    get siguienteNumero() {
        this.ultimoNumero++;
        return this.ultimoNumero;
    }

    // 3 que estan en las tarjetas y 10 en el historial
    get ultimos13() {
        return this.asignados.slice(0, 13);
    }

    crearTicket() {
        const nuevoTicket = new Ticket(this.siguienteNumero);
        this.pendientes.push(nuevoTicket);
        return nuevoTicket;
    }

    asignarTicket(agente, escritorio) {
        if (this.pendientes.length === 0) {
            return null;
        }
        /* `const siguienteTicket = this.pendientes.shift();` is removing the first element from the
        `pendientes` array and assigning it to the `siguienteTicket` constant. This is simulating
        the process of assigning a ticket to an agent, where the first ticket in the pending list is
        assigned to the agent. */
        const siguienteTicket = this.pendientes.shift();

        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;

        this.asignados.unshift(siguienteTicket);

        return siguienteTicket;
    }
}

module.exports = TicketList;