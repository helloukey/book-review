// Get user data
const getUser = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/get-user",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Register user
const registerUser = async (user: object) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/register",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Login user
const loginUser = async (user: object) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Logout user
const logoutUser = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/logout",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Update user
const updateUser = async (user: object) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/update-user",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Verify user
const verifyUser = async (otpId: string, otp: string) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/verify",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ otpId, otp }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { getUser, registerUser, loginUser, logoutUser, updateUser, verifyUser };
