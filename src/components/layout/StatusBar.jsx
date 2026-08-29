function StatusBar() {
  return (
    <footer
      style={{
        height: "32px",
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        borderTop: "1px solid #ddd",
        background: "#f5f5f5",
        fontSize: "12px",
      }}
    >
      Ready | Electron | React
    </footer>
  );
}

export default StatusBar;