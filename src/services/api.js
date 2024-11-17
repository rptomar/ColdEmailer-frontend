export const saveFlowchart = async (flowchart) => {
    try {
      const response = await fetch("http://localhost:5000/api/save-flowchart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flowchart),
      });
      if (!response.ok) {
        throw new Error("Failed to save flowchart");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  