import { useVisitorContext } from "../hooks/useVisitorContext";

const VisitorList = () => {
  const { visitors } = useVisitorContext();

  if (!visitors.length) {
    return <p>No visitors found.</p>;
  }

  return (
    <div>
      <h3>Visitors</h3>
      <ul>
        {visitors.map((visitor) => (
          <li key={visitor.id}>
            {visitor.name} ({visitor.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitorList;
