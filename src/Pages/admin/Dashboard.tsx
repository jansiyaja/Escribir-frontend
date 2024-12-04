
import { 

  Bell, 
  Search, 

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
  BarChart, 
  Bar 
} from 'recharts';

const DashBoardAdmin = () => {
  // Sample data for charts and statistics
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 4000, users: 2400 },
    { month: 'Feb', revenue: 3000, users: 1398 },
    { month: 'Mar', revenue: 2000, users: 9800 },
    { month: 'Apr', revenue: 2780, users: 3908 },
    { month: 'May', revenue: 1890, users: 4800 },
    { month: 'Jun', revenue: 2390, users: 3800 }
  ];

  const revenueSourceData = [
    { name: 'Subscriptions', value: 400, color: '#0088FE' },
    { name: 'Product Sales', value: 300, color: '#00C49F' },
    { name: 'Consulting', value: 200, color: '#FFBB28' }
  ];

  const performanceData = [
    { name: 'Conversion Rate', value: 65, color: '#8884d8' },
    { name: 'Customer Satisfaction', value: 85, color: '#82ca9d' },
    { name: 'Retention Rate', value: 75, color: '#ffc658' }
  ];

  const topStatistics = [
    { 
      title: 'Total Revenue', 
      value: '$452,893', 
      change: '+12.5%', 
      color: 'text-green-500' 
    },
    { 
      title: 'New Users', 
      value: '3,521', 
      change: '+8.2%', 
      color: 'text-blue-500' 
    },
    { 
      title: 'Active Projects', 
      value: '126', 
      change: '+5.1%', 
      color: 'text-purple-500' 
    },
    { 
      title: 'Customer Satisfaction', 
      value: '92%', 
      change: '+3.7%', 
      color: 'text-orange-500' 
    }
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-lg p-6">
        <div className="flex items-center mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-3"></div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-xs text-gray-500">Business Analytics</p>
          </div>
        </div>

        <nav>
          {[
            'Dashboard', 'Analytics', 'Users', 'Projects', 'Reports', 'Settings'
          ].map((item) => (
            <div 
              key={item}
              className="flex items-center p-3 rounded-lg mb-2 cursor-pointer hover:bg-blue-50 text-gray-600 hover:text-blue-600"
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500">Comprehensive Business Insights</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
            <Bell className="text-gray-600 hover:text-blue-600 cursor-pointer" size={24} />
          </div>
        </header>

        {/* Top Statistics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {topStatistics.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                <span className={`text-xs ${stat.color} bg-green-100 px-2 py-1 rounded-full`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Revenue Line Chart */}
          <div className="col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Revenue Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Sources Pie Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Sources</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Bar Chart */}
          <div className="col-span-3 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;