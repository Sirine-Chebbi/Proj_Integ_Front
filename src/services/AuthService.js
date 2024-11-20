export async function send_login(email, password) {
  try {
    const response = await fetch("http://192.168.100.80:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

	if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || response.statusText,
      };
    }
  } catch (error) {
    return { success: false, error: "Network error or server not reachable" };
  }
}
