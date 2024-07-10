import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const OTP = (props: Props) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useParams();
  console.log(location);

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
  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log(otpValue);
  }

  return (
    <div className="flex items-center justify-center bg-white px-4 sm:px-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Enter Your OTP
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
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export { OTP };
