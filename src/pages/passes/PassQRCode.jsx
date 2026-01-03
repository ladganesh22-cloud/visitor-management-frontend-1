import { useEffect, useState } from "react";
import QRCode from "qrcode";

const PassQRCode = ({ pass }) => {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (!pass) return;

    const qrValue = JSON.stringify({
      passNumber: pass.passNumber,
      visitorId: pass.visitorId,
      validTo: pass.validTo,
    });

    QRCode.toDataURL(qrValue, { width: 180 })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error("QR Code error:", err));
  }, [pass]);

  return (
    <div>
      <h4>QR Code</h4>

      {!qrUrl && <p>Generating QR...</p>}

      {qrUrl && (
        <img
          src={qrUrl}
          alt="Visitor Pass QR Code"
          width={180}
          height={180}
        />
      )}
    </div>
  );
};

export default PassQRCode;
