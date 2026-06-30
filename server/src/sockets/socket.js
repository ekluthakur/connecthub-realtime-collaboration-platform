export default function initializeSocket(io) {
  const rooms = new Map();

  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);

    // =========================
    // JOIN ROOM
    // =========================
    socket.on("join-room", ({ meetingId, user }) => {
     socket.join(meetingId);

      if (!rooms.has(meetingId)) {
        rooms.set(meetingId, []);
      }

      const participants = rooms.get(meetingId);

      const alreadyExists = participants.find(
        (p) => p.socketId === socket.id
      );

      if (!alreadyExists) {
        participants.push({
          socketId: socket.id,
          username: user.username,
          email: user.email,
        });
      }

      io.to(meetingId).emit("participants-update", participants);

      // Notify existing users only
      socket.to(meetingId).emit("user-joined", {
        socketId: socket.id,
        user,
      });

      // Tell the new user who is already in the room
      const existingParticipants = participants.filter(
        (p) => p.socketId !== socket.id
      );

      socket.emit("existing-participants", existingParticipants);

      console.log(`${user.username} joined ${meetingId}`);
    });

    // =========================
    // WEBRTC OFFER
    // =========================
    socket.on("offer", ({ target, offer }) => {
      io.to(target).emit("offer", {
        offer,
        caller: socket.id,
      });
    });

    // =========================
    // WEBRTC ANSWER
    // =========================
    socket.on("answer", ({ target, answer }) => {
      io.to(target).emit("answer", {
        answer,
        caller: socket.id,
      });
    });

    // =========================
    // ICE CANDIDATE
    // =========================
    socket.on("ice-candidate", ({ target, candidate }) => {
      io.to(target).emit("ice-candidate", {
        candidate,
        caller: socket.id,
      });
    });

    // =========================
    // CHAT
    // =========================
    socket.on("send-message", ({ meetingId, message, sender }) => {
      io.to(meetingId).emit("receive-message", {
        sender,
        message,
        time: new Date().toLocaleTimeString(),
      });
    });

    // =========================
    // WHITEBOARD
    // =========================
    socket.on("whiteboard-draw", ({ meetingId, data }) => {
      socket.to(meetingId).emit("whiteboard-draw", data);
    });

    socket.on("whiteboard-clear", ({ meetingId }) => {
      socket.to(meetingId).emit("whiteboard-clear");
    });

    // =========================
    // SCREEN SHARE
    // =========================
    socket.on("screen-share-start", ({ meetingId }) => {
      socket.to(meetingId).emit("screen-share-start");
    });

    socket.on("screen-share-stop", ({ meetingId }) => {
      socket.to(meetingId).emit("screen-share-stop");
    });

    // =========================
    // FILE SHARE
    // =========================
    socket.on("file-shared", ({ meetingId, file }) => {
      socket.to(meetingId).emit("file-shared", file);
    });

    // =========================
    // LEAVE ROOM
    // =========================
    socket.on("leave-room", ({ meetingId }) => {
      socket.leave(meetingId);

      if (rooms.has(meetingId)) {
        const updated = rooms
          .get(meetingId)
          .filter((p) => p.socketId !== socket.id);

        rooms.set(meetingId, updated);

        io.to(meetingId).emit("participants-update", updated);

        socket.to(meetingId).emit("user-left", socket.id);
      }
    });

    // =========================
    // DISCONNECT
    // =========================
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);

      rooms.forEach((participants, meetingId) => {
        const updated = participants.filter(
          (p) => p.socketId !== socket.id
        );

        rooms.set(meetingId, updated);

        io.to(meetingId).emit("participants-update", updated);

        socket.to(meetingId).emit("user-left", socket.id);
      });
    });
  });
}