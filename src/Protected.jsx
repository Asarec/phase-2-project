import { Navigate } from "react-router-dom";

function Protected({ loginStatus, children }) {
  if (!loginStatus) {
    return <Navigate to="/" replace />
  }

  return children;
}

export default Protected;