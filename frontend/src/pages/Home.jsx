import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">AI Interview Practice</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/interview")}
      >
        Start Interview
      </button>
    </div>
  );
}

export default Home;
