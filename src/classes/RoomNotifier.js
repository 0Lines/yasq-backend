class RoomNotifier {
	static ioServer = null;

    constructor(ioServer) {
		if(this.ioServer == null)
			this.ioServer = ioServer;
    }

	notifyRoom(id_room, eventName, parameter) {
		this.ioServer.in(id_room).emit(eventName, parameter);
	}
}
  
module.exports = RoomNotifier 