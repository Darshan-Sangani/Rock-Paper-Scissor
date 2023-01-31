import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "../pages/Welcome";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* {roomId ? (
          <>
            <Route path="/game" element={<Game />} />
            <Route path="/result" element={<Result />} />
          </>
        ) : (
          <Route path="/*" element={<Welcome />} />
        )} */}
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
};
