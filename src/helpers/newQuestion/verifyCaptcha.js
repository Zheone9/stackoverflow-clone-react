const handleHCaptchaVerify = async (token) => {
  // Envía el token al backend
  const APIURL = import.meta.env.VITE_REACT_API_URL;
  const jwtToken = localStorage.getItem("token");
  const response = await fetch(`${APIURL}/verify-hcaptcha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwtToken,
    },
    body: JSON.stringify({ token }),
  });

  // Procesa la respuesta del backend
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
export default handleHCaptchaVerify;
