function NavigationItem({ title }) {
  return (
    <li
      style={{
        padding: "10px 0",
        cursor: "pointer",
      }}
    >
      {title}
    </li>
  );
}

export default NavigationItem;