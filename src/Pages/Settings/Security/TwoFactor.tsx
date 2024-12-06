import { useEffect, useState } from "react";
import { Smartphone, Check, QrCode, X, Clock } from "lucide-react";
import axiosInstance from "../../../services/Api/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";

const TwoFactor = () => {
  const [setupStep, setSetupStep] = useState("start");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  

  if (!user) return null;
  useEffect(() => {
      if (user.twoFactorEnabled) {
        
        
      setTwoFactorEnabled(true);
    }
  });
  console.log(user.twoFactorEnabled);

  useEffect(() => {
    const Generate2fa = async () => {
      if (setupStep === "qr") {
        try {
          const response = await axiosInstance.get("/users/2fa_generate", {
            withCredentials: true,
          });
          if (response.status === 201) {
            console.log(response);

            setQrCodeUrl(response.data.qrCodeUrl);
          }
        } catch (error) {
          console.error("Error fetching QR code:", error);
        }
      }
    };

    Generate2fa();
  }, [setupStep]);

  const handleVerification = async () => {
    try {
      const response = await axiosInstance.post(
        "/users/verify_2fa",
        { token: verificationCode },
        { withCredentials: true }
      );
      if (response.status === 201) {
        const updatedUser = {
          ...user,
          enable2fa: true,
        };
        dispatch(setUser(updatedUser));

        setSetupStep("start");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Verification failed. Please try again.");
    }
  };

  const disable2FA = async () => {
    try {
      const response = await axiosInstance.post(
        "/users/disable_2fa",
        {},
        { withCredentials: true }
      );
      if (response.status === 20) {
        const updatedUser = {
          ...user,
          enable2fa: false,
        };
        dispatch(setUser(updatedUser));
        setTwoFactorEnabled(false);
        setErrorMessage("");
        setSetupStep("start");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Failed to disable 2FA. Please try again.");
    }
  };

  const renderStartStep = () => (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <Smartphone className="text-blue-600 w-6 h-6" />
        <h3 className="text-xl font-semibold">
          Two-Factor Authentication (2FA)
        </h3>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-4">
        <div className="flex-grow">
          <p className="font-medium">Enhance Your Account Security</p>
          <p className="text-sm text-gray-600">
            Add an extra layer of protection with two-factor authentication
          </p>
        </div>
        <button
          onClick={() => setSetupStep("qr")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {twoFactorEnabled ? "Manage 2FA" : "Set Up 2FA"}
        </button>
      </div>

      {twoFactorEnabled && (
        <>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-4">
            <Check className="text-green-600 w-6 h-6" />
            <div>
              <p className="font-medium text-green-800">
                Two-Factor Authentication Enabled
              </p>
              <p className="text-sm text-green-700">
                Your account has an extra layer of security
              </p>
            </div>
          </div>
          <button
            onClick={disable2FA}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Disable 2FA
          </button>
        </>
      )}
    </div>
  );

  const renderQRStep = () => (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <QrCode className="text-blue-600 w-6 h-6" />
          <h3 className="text-xl font-semibold">
            Setup Two-Factor Authentication
          </h3>
        </div>
        <button
          onClick={() => setSetupStep("start")}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
            <li>Download an authenticator app</li>
            <li className="font-medium">
              Google Authenticator or Authy recommended
            </li>
            <li>Open the app and tap "Add Account"</li>
            <li>Scan the QR code on the right</li>
          </ol>
          <button
            onClick={() => setSetupStep("verify")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next: Verify Code
          </button>
        </div>

        <div className="flex justify-center bg-gray-100 p-6 rounded-lg">
          <div className="w-48 h-48 bg-white p-4 border-4 border-blue-600">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR Code for 2FA"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerifyStep = () => (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <Clock className="text-blue-600 w-6 h-6" />
        <h3 className="text-xl font-semibold">Verify Authentication</h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Enter the 6-digit verification code from your authenticator app
        </p>

        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          maxLength={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-center tracking-widest text-xl"
          placeholder="_ _ _ _ _ _"
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="flex space-x-3">
          <button
            onClick={handleVerification}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
          >
            Verify and Enable
          </button>
          <button
            onClick={() => setSetupStep("qr")}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-full"
          >
            Cancel
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Didn't receive a code? Request a new one
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {setupStep === "start" && renderStartStep()}
      {setupStep === "qr" && renderQRStep()}
      {setupStep === "verify" && renderVerifyStep()}
    </div>
  );
};

export default TwoFactor;
