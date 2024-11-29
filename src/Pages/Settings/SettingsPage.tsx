import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

import SecuritySection from './Security/SecuritySection';
import PremiumPlans from './PremiumSection';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import UserProfile from '../Profile/UserProfile';
import axiosInstance from '../../services/Api/axiosInstance';
import { SubscriptionDetails } from './types';
import AccountDeletionPage from './AccountDeletion';

const SettingsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [activeSection, setActiveSection] = useState<string>('profile');

  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);


  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axiosInstance.get('/users/user-subscription', {
          withCredentials: true,
        });
       
        setSubscriptionDetails({
          plan: response.data.plan,
          expiryDate: response.data.endDate,
          amount: response.data.amount,
          lastPaymentDate: response.data.lastPaymentDate,
        });
      } catch (error) {
        console.error('Failed to fetch subscription details:', error);
      }
    };

    fetchSubscriptionDetails();
  }, []);

 
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <UserProfile />;
     
      case 'security':
        return <SecuritySection  email={user?.email}  lastLoginDate={new Date()}  />;
      case 'account':
        return <AccountDeletionPage />;
      case 'premium':
        return (
          <PremiumPlans
            isPremium={user?.isPremium || false}
            plan={subscriptionDetails?.plan || 'Not Available'}
            expiryDate={subscriptionDetails?.expiryDate || 'Not Available'}
            amount={subscriptionDetails?.amount || 0}
           lastPaymentDate={subscriptionDetails?.lastPaymentDate || 'Not Available'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
