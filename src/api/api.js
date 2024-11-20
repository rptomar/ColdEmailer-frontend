export const saveFlowchart = async (flowchart) => {
    try {
      const response = await fetch("https://coldemailer-backend.onrender.com/api/save-flowchart", {
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
  