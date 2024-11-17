const WaitDelayNode = ({ data }) => {
    return (
      <div className="node wait-delay">
        <h4>Wait/Delay</h4>
        <label>Delay Time (in hours):</label>
        <input type="number" placeholder="Enter delay time" />
      </div>
    );
  };
  
  export default WaitDelayNode;
  