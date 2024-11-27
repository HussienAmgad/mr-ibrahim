import React, { useRef, useState } from "react";

function Cert() {
  const [name, setName] = useState(""); // اسم المستخدم
  const canvasRef = useRef(null); // مرجع للـ Canvas

  const handleDownload = () => {
    if (!name.trim()) {
      alert("الرجاء إدخال اسمك.");
      return;
    }

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `${name}-certificate.png`; // اسم الملف المحمل
    link.href = canvas.toDataURL("image/png"); // تحويل الرسم إلى صورة
    link.click();
  };

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // تحميل الصورة
    const image = new Image();
    image.src = "/certificate-template.png"; // مسار صورة الشهادة
    image.onload = () => {
      // رسم الصورة على الـ Canvas
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // إعداد النص
      ctx.font = "76px Neirizi"; // نوع الخط
      ctx.fillStyle = "green"; // لون النص
      ctx.textAlign = "center"; // محاذاة النص

      // إضافة النص (اسم المستخدم)
      ctx.fillText(name, canvas.width / 2, 270); // ضبط الموقع
    };
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>تحميل شهادة التقدير</h1>
      <input
        type="text"
        placeholder="أدخل اسمك"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={drawCertificate} // تحديث الشهادة عند إدخال الاسم
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          width: "250px",
        }}
      />
      <br />
      <button
        onClick={handleDownload}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        تحميل الشهادة
      </button>

      {/* Canvas لرسم الشهادة */}
      <canvas
        ref={canvasRef}
        width="800"
        height="600"
        style={{
          display: "block",
          margin: "20px auto",
          border: "1px solid #ccc",
        }}
      ></canvas>
    </div>
  );
}

export default Cert;
