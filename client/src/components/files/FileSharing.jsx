import { useState } from "react";
import axios from "axios";
import socket from "../../services/socket/socket";

export default function FileSharing({
  meetingId,
}) {
  const [uploading, setUploading] =
    useState(false);

  async function uploadFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData
      );

      socket.emit("file-shared", {
        meetingId,
        file: data.file,
      });

      alert("File Shared Successfully");
    } catch (err) {
      console.error(err);
    }

    setUploading(false);
  }

  return (
    <label className="cursor-pointer">

      <input
        hidden
        type="file"
        onChange={uploadFile}
      />

      <div className="px-5 py-3 rounded-xl bg-slate-800 text-white">

        {uploading
          ? "Uploading..."
          : "📁 Share File"}

      </div>

    </label>
  );
}