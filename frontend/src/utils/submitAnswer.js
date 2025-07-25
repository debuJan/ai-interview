export const submitAnswerToBackend = async (question, answer) => {
  try {
    const response = await fetch("http://localhost:5000/save-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Answer saved successfully:", result);
    } else {
      console.error("❌ Error saving answer:", result.error);
    }
  } catch (err) {
    console.error("🚨 Network error:", err);
  }
};
