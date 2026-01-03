import { useParams } from "react-router-dom";
import { useVisitorContext } from "../hooks/useVisitorContext";

const VisitorDetails = () => {
  const { id } = useParams();
  const { visitors } = useVisitorContext();

  const visitor = visitors.find(
    (v) => v.id === Number(id)
  );

  if (!visitor) {
    return <p>Visitor not found</p>;
  }

  return (
    <div>
      <h3>Visitor Details</h3>
      <p><strong>Name:</strong> {visitor.name}</p>
      <p><strong>Email:</strong> {visitor.email}</p>
      <p><strong>ID:</strong> {visitor.id}</p>
    </div>
  );
};

export default VisitorDetails;
