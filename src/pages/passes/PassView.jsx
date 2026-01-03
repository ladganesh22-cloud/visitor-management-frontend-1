import { useParams } from "react-router-dom";
import PassQRCode from "./PassQRCode";
import PassPDFBadge from "./PassPDFBadge";
import { usePassContext } from "../hooks/usePassContext";
import { useVisitorContext } from "../hooks/useVisitorContext";

const PassView = () => {
  const { id } = useParams();
  const { passes } = usePassContext();
  const { visitors } = useVisitorContext();

  const pass = passes.find((p) => p.id === Number(id));
  if (!pass) return <p>Pass not found</p>;

  const visitor = visitors.find((v) => v.id === pass.visitorId);

  return (
    <div>
      <h2>Visitor Pass</h2>

      <p><strong>Pass No:</strong> {pass.passNumber}</p>
      <p><strong>Name:</strong> {visitor?.name}</p>
      <p><strong>Email:</strong> {visitor?.email}</p>
      <p><strong>Valid:</strong> {pass.validFrom}</p>

      <PassQRCode pass={pass} />
      <PassPDFBadge pass={pass} visitor={visitor} />
    </div>
  );
};

export default PassView;
