export default function MapPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div style={{ width: "100%", height: "100vh" }}>
        <iframe
          src="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh&z=20&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "24px",
          transform: "translateX(-50%)",
          width: "90%",
          background: "#8B5CF6",
          color: "#fff",
          padding: "14px 0",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        Open in Google Maps
      </a>
    </div>
  );
}
