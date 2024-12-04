import { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  Briefcase, 
  DollarSign,
  LucideProps, 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/Route';
import lightLogo from "../../assets/Images/Logo.svg"
import { LIST_BLOGS, LIST_CLIENTS, LIST_USERS } from '../../services/Api/adminApi';

interface DataItem {
  createdAt?: string; 
  username?: string;
  heading?: string;
  businessName?: string;
}
interface DashboardData {
  overviewStats: {
    icon: React.ComponentType<LucideProps>;
    title: string;
    value: string;
    color: string;
    change?: string;
  }[];
  monthlyData: {
    month: string;
    users: number;
    blogs: number;
    clients: number;
    revenue: number;
  }[];
  revenueBreakdown: {
    name: string;
    value: number;
    color: string;
  }[];
  latestActivities: {
    icon: React.ComponentType<LucideProps>;
    title: string;
    description: string;
    time: string;
  }[];
}


const WebsiteAdminDashboard = () => {
const [dashboardData, setDashboardData] = useState<DashboardData>({
  overviewStats: [],
  monthlyData: [],
  revenueBreakdown: [],
  latestActivities: [],
});


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersResponse, blogsResponse, clientResponse] = await Promise.all([
          LIST_USERS(),
          LIST_BLOGS(),
          LIST_CLIENTS(),
        ]);

        // Overview Stats Calculation
        const usersCount = usersResponse.data.length;
        const blogsCount = blogsResponse.data.length;
        const clientCount = clientResponse.data.length;

        let totalSubscriptionAmount = 0;
        usersResponse.data.forEach((user: any) => {
          if (user.subscriptionId && user.subscriptionId.amount) {
            totalSubscriptionAmount += user.subscriptionId.amount;
          }
        });

        const totalPaymentAmount = clientResponse.data.reduce((total: number, item: any) => {
          return total + parseFloat(item.paymentAmount || 0);
        }, 0);

        const totalRevenue = totalSubscriptionAmount + totalPaymentAmount;

        const revenueBreakdown = [
          { name: 'Premium ', value: totalSubscriptionAmount, color: '#0088FE' },
          { name: 'Advertisement', value: totalPaymentAmount, color: '#00C49F' },
        ];

 const  overviewStats= [
    { 
      icon: Users, 
      title: 'Total Users', 
      value: usersCount.toString(), 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      icon: FileText, 
      title: 'Total Blogs', 
       value: blogsCount.toString(), 
      color: 'text-green-600 bg-green-50' 
    },
    { 
      icon: Briefcase, 
      title: 'Total Clients', 
       value: clientCount.toString(), 
      change: '+5.7%',
      color: 'text-purple-600 bg-purple-50' 
    },
    { 
      icon: DollarSign, 
      title: 'Total Revenue', 
      value: totalRevenue.toString(),
      change: '+15.3%',
      color: 'text-orange-600 bg-orange-50' 
    }
  ]

        // Group data by month
        const groupByMonth = (data: any[]) =>
          data.reduce((acc: any, item: any) => {
            const month = new Date(item.createdAt).toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
          }, {});

        const userCounts = groupByMonth(usersResponse.data);
        const blogCounts = groupByMonth(blogsResponse.data);
        const clientCounts = groupByMonth(clientResponse.data);

        const months = [...new Set([...Object.keys(userCounts), ...Object.keys(blogCounts), ...Object.keys(clientCounts)])];
        const monthlyData = months.map((month) => ({
          month,
          users: userCounts[month] || 0,
          blogs: blogCounts[month] || 0,
          clients: clientCounts[month] || 0,
          revenue: (clientCounts[month] || 0) * 300, // Example revenue logic
        }));

        const getLatestEntry = (data: DataItem[]): DataItem | undefined =>
          data
            .filter((item) => item.createdAt) // Ensure valid `createdAt`
            .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())[0];

        const latestUser = getLatestEntry(usersResponse.data);
     
        const latestBlog = getLatestEntry(blogsResponse.data);
     
        
        const latestClient = getLatestEntry(clientResponse.data);
              console.log(latestClient);

        const latestActivities = [
  latestUser && {
    icon: Users,
    title: 'New User Signup',
    description: `${latestUser.username || "A user"} joined the platform.`,
    time: latestUser.createdAt ? new Date(latestUser.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
  },
  latestBlog && {
    icon: FileText,
    title: 'Blog Published',
    description: `${latestBlog.heading || "A blog"} was  Published.`,
    time: latestBlog.createdAt ? new Date(latestBlog.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
  },
  latestClient && {
    icon: Briefcase,
    title: 'New Client',
    description: `${latestClient.businessName || "A client"} added advertisement.`,
    time: latestClient.createdAt ? new Date(latestClient.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
  },
].filter(Boolean) as { icon: React.ComponentType<LucideProps>; title: string; description: string; time: string }[]; 

        setDashboardData(() => ({
          overviewStats,
          monthlyData,
          revenueBreakdown,
          latestActivities
        }));

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1 p-10">
        <div>
          <Link to={ROUTES.ADMIN.DASHBOARD} className="flex-shrink-0">
            <img src={lightLogo} alt="Logo" className="h-14" />
          </Link>
          <h1 className="text-3xl font-bold mb-8 font-bodoni">Website Dashboard</h1>
        </div>

<div className="grid grid-cols-4 gap-6 mb-8">
          {dashboardData.overviewStats.map((stat, index) => (
    
    <div key={index} className={`p-6 rounded-2xl shadow-md ${stat.color} flex items-center justify-between`}>
      <div className="p-3 bg-white/20 rounded-full flex items-center justify-center">
        <stat.icon className="text-white" size={24} />
      </div>
      <div>
        <p className="text-sm opacity-75 mb-1">{stat.title}</p>
        <div className="flex items-center">
          <h3 className="text-2xl font-bold mr-3">{stat.value}</h3>
        </div>
      </div>
    </div>
  ))}
</div>


        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">Monthly Data</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
                <Line type="monotone" dataKey="blogs" stroke="#82ca9d" />
                <Line type="monotone" dataKey="clients" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">Revenue Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={dashboardData.revenueBreakdown} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8">
                  {dashboardData.revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

                 <div className="col-span-3 bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Latest Activities</h2>
            
            </div>
            <div className="space-y-4">
              {dashboardData.latestActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="mr-4 p-3 bg-blue-50 rounded-full">
                    <activity.icon className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{activity.title}</h3>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default WebsiteAdminDashboard;
