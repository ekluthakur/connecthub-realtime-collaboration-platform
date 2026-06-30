import { useEffect, useRef, useState } from "react";
import socket from "../../services/socket/socket";

export default function Whiteboard({ meetingId }) {
  const canvasRef = useRef(null);

  const ctxRef = useRef(null);

  const drawing = useRef(false);

  const [showBoard, setShowBoard] = useState(false);

  useEffect(() => {
    if (!showBoard) return;

    const canvas = canvasRef.current;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2563eb";

    ctxRef.current = ctx;
  }, [showBoard]);

  useEffect(() => {
    socket.on("whiteboard-draw", (data) => {
      drawLine(data,false);
    });

    socket.on("whiteboard-clear", () => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      ctxRef.current.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    });

    return () => {
      socket.off("whiteboard-draw");
      socket.off("whiteboard-clear");
    };
  }, []);

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function drawLine(data, emit = true) {
    const ctx = ctxRef.current;

    ctx.beginPath();

    ctx.moveTo(data.prevX, data.prevY);

    ctx.lineTo(data.x, data.y);

    ctx.stroke();

    if (!emit) return;

    socket.emit("whiteboard-draw", {
      meetingId,
      data,
    });
  }

  function handleDown(e) {
    drawing.current = true;

    const pos = getPos(e);

    drawing.current = {
      x: pos.x,
      y: pos.y,
    };
  }

  function handleMove(e) {
    if (!drawing.current.x) return;

    const pos = getPos(e);

    drawLine({
      prevX: drawing.current.x,
      prevY: drawing.current.y,
      x: pos.x,
      y: pos.y,
    });

    drawing.current = pos;
  }

  function handleUp() {
    drawing.current = false;
  }

  function clearBoard() {
    const canvas = canvasRef.current;

    ctxRef.current.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    socket.emit("whiteboard-clear", {
      meetingId,
    });
  }

  return (
    <>
      <button
        onClick={() =>
          setShowBoard(!showBoard)
        }
        className="bg-slate-800 text-white px-5 py-3 rounded-xl"
      >
        ✏ Whiteboard
      </button>

      {showBoard && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">

          <div className="bg-white rounded-2xl shadow-xl w-[95%] h-[90%] flex flex-col">

            <div className="border-b p-4 flex justify-between">

              <h2 className="font-bold text-xl">
                Whiteboard
              </h2>

              <div className="space-x-3">

                <button
                  onClick={clearBoard}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Clear
                </button>

                <button
                  onClick={() =>
                    setShowBoard(false)
                  }
                  className="bg-slate-800 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>

              </div>

            </div>

            <canvas
              ref={canvasRef}
              className="flex-1 bg-white cursor-crosshair"
              onMouseDown={handleDown}
              onMouseMove={handleMove}
              onMouseUp={handleUp}
              onMouseLeave={handleUp}
            />

          </div>

        </div>
      )}
    </>
  );
}