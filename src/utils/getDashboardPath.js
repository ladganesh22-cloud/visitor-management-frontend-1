export const getDashboardPath = (role) => {
  switch (role) {
    case "admin":
      return "/dashboard";
    case "security":
      return "/security-dashboard";
    case "host":
      return "/host-dashboard";
    default:
      return "/login";
  }
};
