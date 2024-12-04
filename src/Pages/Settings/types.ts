import { User } from "../../Interfaces/slice";

 export type Notifications = {
  email: boolean;
  push: boolean;
  marketing: boolean;
};



 export type SidebarItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type SectionProps = {
  userData: User|null;
    isEditing?: boolean;
 
  onEditChange?: (isEditing: boolean) => void;
   onUserDataChange?: (key: keyof User, value: any) => void;
};
 export interface SubscriptionDetails {
    plan: string;
    expiryDate: string;
    amount: number;
    lastPaymentDate: string;
  };
export interface PaymentSuccessProps {
  amount: number;
  orderId: string;
  customerEmail: string;
  businessName?: string;
}