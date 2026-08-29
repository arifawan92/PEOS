function Header() {
  return (
    <header
      style={{
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #ddd",
        background: "#ffffff",
      }}
    >
      <h2>PEOS</h2>

      <span>v1.0</span>
    </header>
  );
}

export default Header;