const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        // Crear la instancia de nuestro TicketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');
            
            socket.on('solicitar-ticket', ( data, callback ) => {
                // console.log('Nuevo ticket backend');
                const nuevoTicket = this.ticketList.crearTicket();
                // console.log(nuevoTicket);
                callback( nuevoTicket );
                // socket.emit('ticket-asignado', nuevoTicket);
            });

            socket.on('siguiente-ticket-trabajar', ( { agente, escritorio }, callback ) => {
                // console.log(agente, escritorio);
                const suTicket = this.ticketList.asignarTicket( agente, escritorio );
                callback( suTicket );

                this.io.emit('ticket-asignado', this.ticketList.ultimos13);
            })
        
        });
    }


}


module.exports = Sockets;