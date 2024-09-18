
import Spinner from "../Spinner";

import UseOTP from '../Hooks/UseOTP';
const OTP = () => {
    const { error,loading,setOtp,otp ,handleVerifyOtp,resendOtp ,timer,rendering} = UseOTP();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
          if (value && index < otp.length - 1) {
            (document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement).focus();
          }
        }
      };
   
  return (
    <>
     <form className="flex flex-col items-center" onSubmit={handleVerifyOtp}>
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-10 h-10 border border-gray-300 rounded-md text-center text-xl"
                maxLength={1}
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            disabled={loading}
          >
             {loading ? (
          <Spinner size="h-5 w-5" color="text-white" text="verifying OTP..." isLoading={loading} />
        ) : (
          "submit"
        )}
          </button>

          <p className="font-bodoni text-sm text-gray-500 pt-5">
          Didn’t get an OTP?{' '}
          {timer > 0 ? (
            <span className="text-gray-400 cursor-not-allowed">Resend in {timer}s</span>
          ) : (
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={resendOtp}
              style={{ pointerEvents: rendering ? 'none' : 'auto' }}
            >
              Resend It
            </span>
          )}
        </p>
          {error && <p>{error}</p>}
        </form>
    </>
  )
}

export default OTP
