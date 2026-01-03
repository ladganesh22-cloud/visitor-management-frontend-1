
import { send } from "@emailjs/browser";

export const sendAppointmentEmail = async ({
  to_email,
  visitor_name,
  status,
  appointment_date,
  title,
  top_description,
  description_1,
  description_2,
  description_3,
}) => {
  return send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email,
      visitor_name,
      status,
      appointment_date,
      title,
      top_description,
      description_1,
      description_2,
      description_3,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
