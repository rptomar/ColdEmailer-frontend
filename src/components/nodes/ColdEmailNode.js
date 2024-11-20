const ColdEmailNode = ({ data }) => {
  return (
    <div style={{ padding: "10px", border: "1px solid blue", borderRadius: "5px" }}>
      <input
        type="text"
        value={data.heading}
        onChange={(e) => data.onTextChange("heading", e.target.value)}
        style={{ fontWeight: "bold", marginBottom: "5px", width: "100%" }}
        placeholder="Heading"
      />
      <textarea
        value={data.text}
        onChange={(e) => data.onTextChange("text", e.target.value)}
        style={{ width: "100%", height: "60px" }}
        placeholder="Enter email content"
      />
    </div>
  );
};

export default ColdEmailNode;
