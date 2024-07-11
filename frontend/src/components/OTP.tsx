import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { verifyUser } from "../apis/user";

type Props = {};

const OTP = (props: Props) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { otpId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (index: number, value: string) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        setActiveIndex(index - 1);
      }
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }
  };
  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < 6) {
      document.getElementById(`otp-input-${activeIndex}`)?.focus();
    }
  }, [activeIndex]);

  // Handle submit
  const handleSubmit = async () => {
    setError("");
    const otpValue = otp.join("");

    // Check OTP
    if (otpValue.length < 6) {
      setError("Invalid OTP");
      return;
    }

    // Check OTP ID
    if (!otpId) {
      setError("Invalid OTP ID");
      return;
    }

    try {
      setLoading(true);
      const data = await verifyUser(otpId, otpValue);
      setLoading(false);
      if (!data?.success) {
        setError(data.message);
        return;
      }
      if (data?.success) {
        window.location.href = "/profile";
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 sm:px-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Check your email for OTP
        </h2>
        <div className="flex items-center justify-center space-x-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-10 h-10 sm:w-12 sm:h-12">
              <input
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full h-full text-center text-xl sm:text-2xl font-bold bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-md text-red-500 text-center">{error}</p>}

        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { OTP };
