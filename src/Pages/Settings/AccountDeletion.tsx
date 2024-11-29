import { useEffect, useState } from 'react';
import { AlertTriangle, Shield, UserX, Lock } from 'lucide-react';
import { Button, Card, Dialog } from '@radix-ui/themes';
import axiosInstance from '../../services/Api/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const AccountDeletionPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [inputCode, setInputCode] = useState('');
    const [verificationCode, setVerificationCode] = useState("");
    const [step, setStep] = useState('initial');
    const [is2faEnabled, setIs2faEnabled] = useState(false);

    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return null;
    useEffect(() => {
        if (user.twoFactorEnabled) {


            setIs2faEnabled(true);
        }
    });


    const handleDeleteInitiate = async () => {
        try {


            if (is2faEnabled) {
                setStep('verify2fa');
                setIsDialogOpen(true);
            } else {

                const response = await axiosInstance.post('/users/sendverificationEmail', { withCredentials: true });
                if (response.status === 201) {
                    setStep('verification');
                    setIsDialogOpen(true);
                }
            }


        } catch (error) {
            console.error('Verification failed:', error);
        }


    };

    const handleVerification2fa = async () => {

        console.log("iam caales");

        try {
            const response = await axiosInstance.post('/users/verify_2fa', { token: verificationCode }, { withCredentials: true });
            if (response.status === 201) {

                const emailResponse = await axiosInstance.post('/users/sendverificationEmail', { withCredentials: true });
                if (emailResponse.status === 201) {
                    setStep('verification');
                }
            } else {
                alert('Incorrect verification code. Please try again.');
            }
        } catch (error) {
            console.error('Verification failed:', error);
        }
    };
    const handleVerification = async () => {
        console.log(inputCode);
        try {
            const response = await axiosInstance.post('/users/verification', { code: inputCode }, { withCredentials: true });
            if (response.status === 201) {
                setStep('confirmed');
            } else {
                alert('Incorrect verification code. Please try again.');
            }
        } catch (error) {
            console.error('Verification failed:', error);
        }
    };

    const handleAccountDeletion = async () => {
        try {
            const response = await axiosInstance.post('/users/account_delete', { withCredentials: true });
            if (response.status = 201) {
                alert('Account successfully deleted.');
                setIsDialogOpen(false);
                setStep('initial');
                window.location.href = '/login';
            }

        } catch (error) {
            console.error('Account deletion failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

              <Card>
        <div className="pt-6 space-y-4">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium capitalize"> Notifications</h3>
                <p className="text-sm text-gray-500">
                  Toggle notifications
                </p>
              </div>
              <input
                type="checkbox"
               
             
                className="h-6 w-6"
              />
            </div>
       
        </div>
      </Card>
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-8">

                <div className="text-center">
                    <UserX className="mx-auto h-16 w-16 text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">Delete Your Account</h1>
                    <p className="text-gray-600">This action is irreversible. Please proceed with caution.</p>
                </div>


                <div className="space-y-4">
                    <div className="flex items-start gap-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-4">
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        <div>
                            <h3 className="font-semibold text-yellow-800">Important Notes</h3>
                            <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1">
                                <li>Your account data will be permanently removed.</li>
                                <li>This action cannot be undone.</li>
                                <li>Ensure you have backups of any important information.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4">
                        <Shield className="h-6 w-6 text-blue-500" />
                        <div>
                            <h3 className="font-semibold text-blue-800">Verification Steps</h3>
                            <ol className="list-decimal list-inside text-blue-700 text-sm space-y-1">
                                <li>Click "Start Deletion".</li>
                                <li>Receive a 6-digit code via email.</li>
                                <li>Enter the code to confirm.</li>
                                <li>Complete final deletion.</li>
                            </ol>
                        </div>
                    </div>
                </div>


                <Button variant="solid" className="w-full text-white bg-red-500 hover:bg-red-600" onClick={handleDeleteInitiate}>
                    <Lock className="mr-2 h-4 w-4" /> Start Deletion
                </Button>


                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Dialog.Content className="rounded-lg p-6 bg-white shadow-xl">
                        {step === 'verification' && (
                            <>
                                <Dialog.Title className="text-lg font-bold text-gray-800">Verify Account Deletion</Dialog.Title>
                                <Dialog.Description className="text-gray-600 mb-4">
                                    Enter the 6-digit code sent to your email.
                                </Dialog.Description>

                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value)}

                                        placeholder="Enter verification code"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <Dialog.Close>
                                            <Button variant="outline" className="text-gray-700">Cancel</Button>
                                        </Dialog.Close>
                                        <Button variant="solid" onClick={handleVerification} className="bg-blue-500 text-white hover:bg-blue-600">
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 'verify2fa' && (
                            <>
                                <Dialog.Title className="text-lg font-bold text-gray-800">Verify Two-Factor Authentication</Dialog.Title>
                                <Dialog.Description className="text-gray-600 mb-4">
                                    Enter the 6-digit code sent to your authenticator app.
                                </Dialog.Description>

                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        placeholder="Enter verification code"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <Dialog.Close>
                                            <Button variant="outline" className="text-gray-700">Cancel</Button>
                                        </Dialog.Close>
                                        <Button variant="solid" onClick={handleVerification2fa} className="bg-blue-500 text-white hover:bg-blue-600">
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 'confirmed' && (
                            <>
                                <Dialog.Title className="text-lg font-bold text-gray-800">Confirm Deletion</Dialog.Title>
                                <Dialog.Description className="text-gray-600 mb-4">
                                    Are you sure you want to delete your account? This action is irreversible.
                                </Dialog.Description>

                                <div className="flex justify-end space-x-4">
                                    <Dialog.Close>
                                        <Button variant="outline" className="text-gray-700">Cancel</Button>
                                    </Dialog.Close>
                                    <Button variant="solid" onClick={handleAccountDeletion} className="bg-red-500 text-white hover:bg-red-600">
                                        Confirm Deletion
                                    </Button>
                                </div>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Root>
            </div>
        </div>
    );
};

export default AccountDeletionPage;
