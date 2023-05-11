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

            // Escuchar evento: mensaje-to-server
            // socket.on('mensaje-to-server', ( data ) => {
            //     console.log( data );
                
            //     this.io.emit('mensaje-from-server', data );
            // });
            
            socket.on('solicitar-ticket', ( data, callback ) => {
                // console.log('Nuevo ticket backend');
                const nuevoTicket = this.ticketList.crearTicket();
                // console.log(nuevoTicket);
                callback( nuevoTicket );
                // socket.emit('ticket-asignado', nuevoTicket);
            });
        
        });
    }


}


module.exports = Sockets;