import { Link } from "react-router-dom";
import { usePassContext } from "../hooks/usePassContext";
import { useVisitorContext } from "../hooks/useVisitorContext";

const PassList = () => {
  const { passes } = usePassContext();
  const { visitors } = useVisitorContext();

  const getVisitorName = (id) =>
    visitors.find((v) => v.id === id)?.name;

  return (
    <div>
      <h2>Issued Passes</h2>

      {!passes.length && <p>No passes issued</p>}

      <ul>
        {passes.map((pass) => (
          <li key={pass.id}>
            <Link to={`/passes/${pass.id}`}>
              {pass.passNumber} — {getVisitorName(pass.visitorId)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassList;
