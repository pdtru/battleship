const Header = () => {
  return (
    <div
      style={{
        flex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        color: "rgba(75, 75, 75, 255)",
        backgroundColor: "#F5F5F5",
      }}
    >
      <p style={{ fontSize: "32px", fontWeight: "800" }}>Battleship</p>
    </div>
  );
};

export default Header;
