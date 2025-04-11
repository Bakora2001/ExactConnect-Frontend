// import { 
//   Laptop, 
//   Server, 
//   FileImage, 
//   Phone, 
//   CreditCard, 
//   ShoppingCart, 
//   TrendingUp,
//   ActivitySquare,
//   Sparkles,
//   ChartBar,
//   Bell,
//   CalendarDays,
//   TrendingDown,
//   AlertCircle,
//   CheckCircle2,
//   LightbulbIcon,
//   ArrowRightCircle,
//   ArrowRight
// } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// import { useToast } from '@/hooks/use-toast';

// // Import custom components
// import ProxyUsageChart from './ProxyUsageChart';
// import VccOverview from './VccOverview';

// const DashboardOverview = () => {
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(true);
//   const [userInfo, setUserInfo] = useState({
//     name: 'User',
//     email: 'user@example.com'
//   });
//   const [accountStats, setAccountStats] = useState({
//     totalSpent: '0.00',
//     activeServiceTypes: 0,
//     proxyBandwidthUsed: 0,
//     lastMonthComparison: 0
//   });
//   const [serviceStats, setServiceStats] = useState({
//     proxies: 0,
//     vps: 0,
//     templates: 0,
//     nonVoip: 0,
//     vcc: 0,
//     orders: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [trendingProducts, setTrendingProducts] = useState([]);
//   const [upcomingRenewals, setUpcomingRenewals] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [proxyUsageData, setProxyUsageData] = useState([]);
//   const [vccStats, setVccStats] = useState({
//     active: 0,
//     expiring: 0,
//     total: 0
//   });
//   const [tipOfTheDay, setTipOfTheDay] = useState({
//     title: '',
//     content: ''
//   });
  
//   // Simulate fetching data from API
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setIsLoading(true);
      
//       try {
//         // Simulate API latency
//         await new Promise(resolve => setTimeout(resolve, 1200));
        
//         // User info
//         setUserInfo({
//           name: 'John Doe',
//           email: 'john@exactconnect.com'
//         });
        
//         // Account stats
//         setAccountStats({
//           totalSpent: '1,249.50',
//           activeServiceTypes: 3,
//           proxyBandwidthUsed: 85,
//           lastMonthComparison: 12
//         });
        
//         // Service stats
//         setServiceStats({
//           proxies: 12,
//           vps: 2,
//           templates: 5,
//           nonVoip: 0,
//           vcc: 3,
//           orders: 8
//         });
        
//         // Recent activity
//         setRecentActivity([
//           {
//             id: 'act-1',
//             type: 'purchase',
//             product: 'Premium Proxy Package',
//             date: '2025-04-09',
//             amount: '49.99'
//           },
//           {
//             id: 'act-2',
//             type: 'renewal',
//             product: 'VPS Server - Germany',
//             date: '2025-04-07',
//             amount: '29.99'
//           },
//           {
//             id: 'act-3',
//             type: 'purchase',
//             product: 'Virtual Credit Card',
//             date: '2025-04-02',
//             amount: '15.00'
//           }
//         ]);

//         // Trending products
//         setTrendingProducts([
//           { 
//             id: 'trend-1', 
//             name: 'US Residential Proxies', 
//             category: 'proxies',
//             trend: 'up',
//             percent: 23
//           },
//           { 
//             id: 'trend-2', 
//             name: 'UK Static Proxies', 
//             category: 'proxies',
//             trend: 'up',
//             percent: 17
//           },
//           { 
//             id: 'trend-3', 
//             name: 'Germany VPS Servers', 
//             category: 'vps',
//             trend: 'up',
//             percent: 12
//           }
//         ]);

//         // Upcoming renewals
//         setUpcomingRenewals([
//           {
//             id: 'renew-1',
//             service: 'Premium US Proxy Pack',
//             renewalDate: '2025-04-15',
//             price: 39.99
//           },
//           {
//             id: 'renew-2',
//             service: 'VPS Server - Germany',
//             renewalDate: '2025-04-22',
//             price: 29.99
//           }
//         ]);

//         // Notifications
//         setNotifications([
//           {
//             id: 'notif-1',
//             type: 'alert',
//             message: 'Your UK proxy bandwidth is above 90% utilization',
//             date: '2025-04-10'
//           },
//           {
//             id: 'notif-2',
//             type: 'info',
//             message: 'System maintenance scheduled for April 15',
//             date: '2025-04-09'
//           }
//         ]);

//         // Proxy usage data
//         setProxyUsageData([
//           { name: 'US', value: 45 },
//           { name: 'UK', value: 28 },
//           { name: 'DE', value: 17 },
//           { name: 'JP', value: 10 }
//         ]);

//         // VCC stats
//         setVccStats({
//           active: 3,
//           expiring: 1,
//           total: 5
//         });

//         // Tip of the day
//         setTipOfTheDay({
//           title: 'Proxy Rotation',
//           content: 'Setting up automatic proxy rotation can help avoid IP blocking and improve your success rates. Enable this feature in your proxy dashboard.'
//         });
        
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         toast({
//           title: "Error Loading Dashboard",
//           description: "Could not load your dashboard data. Please try again.",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchDashboardData();
//   }, [toast]);
  
//   // Calculate active services from service stats
//   const activeServicesCount = Object.values(serviceStats).filter(count => count > 0).length;
  
//   // Service cards data
//   const serviceCards = [
//     {
//       title: 'Proxies',
//       icon: Laptop,
//       color: 'bg-purple-400',
//       hoverColor: 'hover:bg-purple-500',
//       count: serviceStats.proxies,
//       path: '/dashboard/proxies'
//     },
//     {
//       title: 'VPS Servers',
//       icon: Server,
//       color: 'bg-purple-500',
//       hoverColor: 'hover:bg-purple-600',
//       count: serviceStats.vps,
//       path: '/dashboard/vps'
//     },
//     {
//       title: 'PSD Templates',
//       icon: FileImage,
//       color: 'bg-amber-500',
//       hoverColor: 'hover:bg-amber-600',
//       count: serviceStats.templates,
//       path: '/dashboard/templates'
//     },
//     {
//       title: 'Non-VOIP Numbers',
//       icon: Phone,
//       color: 'bg-violet-400',
//       hoverColor: 'hover:bg-violet-500',
//       count: serviceStats.nonVoip,
//       path: '/dashboard/nonvoip'
//     },
//     {
//       title: 'VCC Cards',
//       icon: CreditCard,
//       color: 'bg-amber-400',
//       hoverColor: 'hover:bg-amber-500',
//       count: serviceStats.vcc,
//       path: '/dashboard/vcc'
//     },
//     {
//       title: 'Orders',
//       icon: ShoppingCart,
//       color: 'bg-purple-600',
//       hoverColor: 'hover:bg-purple-700',
//       count: serviceStats.orders,
//       path: '/dashboard/orders'
//     }
//   ];

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Calculate days remaining until a date
//   const getDaysRemaining = (dateString) => {
//     const today = new Date();
//     const targetDate = new Date(dateString);
//     const timeDiff = targetDate.getTime() - today.getTime();
//     return Math.ceil(timeDiff / (1000 * 3600 * 24));
//   };

//   return (
//     <div className="animate-fade-in space-y-8">
//       {/* Welcome Section with Animation and Performance Insight */}
//       <Card className="overflow-hidden border border-purple-200 transform transition-all duration-500 hover:shadow-lg hover:border-amber-300">
//         <div className="bg-gradient-to-r from-purple-100 to-amber-50 p-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="animate-fade-in">
//               <h1 className="text-3xl font-bold text-purple-900">
//                 Welcome back, {isLoading ? '...' : userInfo.name}!
//               </h1>
//               <p className="text-purple-700 mt-2 text-lg">
//                 Here's an overview of your ExactConnect services and account
//               </p>

//               {/* Personalized data insight */}
//               {!isLoading && (
//                 <div className="mt-4 bg-white/50 p-3 rounded-lg border border-purple-100 shadow-sm">
//                   <p className="text-purple-800">
//                     <span className="font-semibold">Performance Insight:</span> You've used 
//                     <span className="font-bold text-amber-600"> {accountStats.proxyBandwidthUsed}%</span> of your proxy bandwidth this month 
//                     {accountStats.lastMonthComparison > 0 ? 
//                       <span className="text-green-600"> — up {accountStats.lastMonthComparison}% from last month</span> : 
//                       <span className="text-red-500"> — down {Math.abs(accountStats.lastMonthComparison)}% from last month</span>
//                     }
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="hidden md:flex items-center space-x-2">
//               <div className="animate-pulse">
//                 <Sparkles className="h-12 w-12 text-amber-400" />
//               </div>
//               {!isLoading && notifications.length > 0 && (
//                 <div className="relative">
//                   <Bell className="h-10 w-10 text-purple-500 cursor-pointer hover:text-purple-700 transition-colors" />
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {notifications.length}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Card>
      
//       {/* Main Dashboard Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Stats and Visualizations */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Stats Overview with Animation */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {/* Total Spent */}
//             <Card className="border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
//               <CardContent className="p-4 pt-6">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-purple-600 uppercase tracking-wider">Total Spent</p>
//                     {isLoading ? (
//                       <Skeleton className="h-8 w-24 mt-1" />
//                     ) : (
//                       <h3 className="text-2xl font-extrabold text-purple-900">${accountStats.totalSpent}</h3>
//                     )}
//                   </div>
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-amber-300 flex items-center justify-center text-white shadow-md">
//                     <TrendingUp className="h-5 w-5" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Active Services */}
//             <Card className="border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
//               <CardContent className="p-4 pt-6">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-purple-600 uppercase tracking-wider">Active Services</p>
//                     {isLoading ? (
//                       <Skeleton className="h-8 w-20 mt-1" />
//                     ) : (
//                       <h3 className="text-2xl font-extrabold text-purple-900">{activeServicesCount} / 6</h3>
//                     )}
//                   </div>
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-amber-300 flex items-center justify-center text-white shadow-md">
//                     <ActivitySquare className="h-5 w-5" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Proxy Usage */}
//             <Card className="border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
//               <CardContent className="p-4 pt-6">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-purple-600 uppercase tracking-wider">Bandwidth Used</p>
//                     {isLoading ? (
//                       <Skeleton className="h-8 w-20 mt-1" />
//                     ) : (
//                       <h3 className="text-2xl font-extrabold text-purple-900">{accountStats.proxyBandwidthUsed}%</h3>
//                     )}
//                   </div>
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-amber-300 flex items-center justify-center text-white shadow-md">
//                     <ChartBar className="h-5 w-5" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Dynamic Visualization - Proxy Usage Data */}
//           <Card className="border border-purple-100">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg font-semibold text-purple-900">Proxy Usage by Location</CardTitle>
//               <CardDescription>Distribution of your active proxies by region</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-0">
//               {isLoading ? (
//                 <div className="h-64 w-full flex items-center justify-center">
//                   <Skeleton className="h-56 w-full rounded-lg" />
//                 </div>
//               ) : (
//                 <div className="h-64">
//                   {/* This would be replaced with actual chart component */}
//                   <div className="bg-gray-50 h-full rounded-lg p-4 flex flex-col justify-center items-center">
//                     <ChartBar className="h-12 w-12 text-purple-300 mb-4" />
//                     <p className="text-purple-900 font-medium">Proxy Usage Chart</p>
//                     <p className="text-sm text-purple-600">Top region: US (45%)</p>
//                     <div className="w-full mt-4 grid grid-cols-4 gap-2">
//                       {proxyUsageData.map((item) => (
//                         <div key={item.name} className="flex flex-col items-center">
//                           <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div 
//                               className="bg-purple-500 h-2.5 rounded-full" 
//                               style={{ width: `${item.value}%` }}
//                             ></div>
//                           </div>
//                           <span className="text-xs text-purple-700 mt-1">{item.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Recent Activity */}
//           <Card className="border border-purple-50">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg font-semibold text-purple-900">Recent Activity</CardTitle>
//               <CardDescription>Your latest transactions and service activities</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-0">
//               {isLoading ? (
//                 <div className="space-y-4">
//                   {[...Array(3)].map((_, i) => (
//                     <Skeleton key={i} className="h-16 w-full rounded-lg" />
//                   ))}
//                 </div>
//               ) : recentActivity.length > 0 ? (
//                 <div className="divide-y divide-purple-100">
//                   {recentActivity.map((activity, index) => (
//                     <div 
//                       key={activity.id} 
//                       className="py-3 flex justify-between items-center hover:bg-purple-50 rounded-lg px-3 transition-colors group"
//                       style={{ animationDelay: `${index * 150}ms` }}
//                     >
//                       <div>
//                         <p className="font-semibold text-purple-900">{activity.product}</p>
//                         <p className="text-sm text-purple-600">{formatDate(activity.date)}</p>
//                       </div>
//                       <div className="flex items-center">
//                         <p className="font-bold text-purple-900 bg-amber-100 py-1 px-3 rounded-full">${activity.amount}</p>
//                         <span className="ml-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-purple-500">
//                   <div className="mb-4 text-amber-400">
//                     <ActivitySquare className="h-10 w-10 mx-auto" />
//                   </div>
//                   <p className="text-lg">No recent activity to display</p>
//                   <p className="text-sm text-purple-400 mt-1">Your activity will appear here once you start using our services</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column - Services and Info */}
//         <div className="space-y-8">
//           {/* Account Health - Upcoming Renewals */}
//           <Card className="border border-purple-100">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center text-lg font-semibold text-purple-900">
//                 <CalendarDays className="mr-2 h-5 w-5 text-amber-500" />
//                 Upcoming Renewals
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-0">
//               {isLoading ? (
//                 <div className="space-y-3">
//                   {[...Array(2)].map((_, i) => (
//                     <Skeleton key={i} className="h-16 w-full rounded-lg" />
//                   ))}
//                 </div>
//               ) : upcomingRenewals.length > 0 ? (
//                 <div className="space-y-3">
//                   {upcomingRenewals.map((renewal) => {
//                     const daysRemaining = getDaysRemaining(renewal.renewalDate);
//                     return (
//                       <div key={renewal.id} className="p-3 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <p className="font-medium text-purple-900">{renewal.service}</p>
//                             <p className="text-sm text-purple-600">
//                               Renews: {formatDate(renewal.renewalDate)}
//                             </p>
//                           </div>
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             daysRemaining <= 3 ? 'bg-red-100 text-red-700' :
//                             daysRemaining <= 7 ? 'bg-amber-100 text-amber-700' :
//                             'bg-green-100 text-green-700'
//                           }`}>
//                             {daysRemaining} days
//                           </span>
//                         </div>
//                         <div className="mt-2 flex justify-between items-center">
//                           <span className="text-sm font-bold text-purple-900">${renewal.price}</span>
//                           <button className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
//                             Renew Now
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="p-6 text-center text-purple-500">
//                   <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
//                   <p>No upcoming renewals</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Trending Products/Services */}
//           <Card className="border border-amber-100">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center text-lg font-semibold text-purple-900">
//                 <TrendingUp className="mr-2 h-5 w-5 text-amber-500" />
//                 Trending Services
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-0">
//               {isLoading ? (
//                 <div className="space-y-3">
//                   {[...Array(3)].map((_, i) => (
//                     <Skeleton key={i} className="h-12 w-full rounded-lg" />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {trendingProducts.map((product) => (
//                     <div 
//                       key={product.id} 
//                       className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 transition-all"
//                     >
//                       <div className="flex items-center">
//                         {product.trend === 'up' ? 
//                           <TrendingUp className="h-4 w-4 text-green-500 mr-2" /> : 
//                           <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
//                         }
//                         <span className="text-purple-900 font-medium">{product.name}</span>
//                       </div>
//                       <span className={`text-xs font-medium px-2 py-1 rounded-full ${
//                         product.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                       }`}>
//                         {product.trend === 'up' ? '+' : '-'}{product.percent}%
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="pt-0">
//               <Link 
//                 to="/dashboard/trending" 
//                 className="text-sm text-amber-600 hover:text-amber-700 transition-colors flex items-center"
//               >
//                 View all trending services <ArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </CardFooter>
//           </Card>

//           {/* VCC Cards Overview */}
//           <Card className="border border-purple-100">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center text-lg font-semibold text-purple-900">
//                 <CreditCard className="mr-2 h-5 w-5 text-amber-500" />
//                 VCC Cards Overview
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-0">
//               {isLoading ? (
//                 <Skeleton className="h-24 w-full rounded-lg" />
//               ) : (
//                 <div className="space-y-3">
//                   <div className="grid grid-cols-3 gap-2 text-center">
//                     <div className="bg-purple-50 p-2 rounded-lg">
//                       <p className="text-lg font-bold text-purple-900">{vccStats.active}</p>
//                       <p className="text-xs text-purple-600">Active</p>
//                     </div>
//                     <div className="bg-amber-50 p-2 rounded-lg">
//                       <p className="text-lg font-bold text-amber-600">{vccStats.expiring}</p>
//                       <p className="text-xs text-amber-600">Expiring Soon</p>
//                     </div>
//                     <div className="bg-gray-50 p-2 rounded-lg">
//                       <p className="text-lg font-bold text-gray-700">{vccStats.total}</p>
//                       <p className="text-xs text-gray-600">Total</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-center">
//                     <Link
//                       to="/dashboard/vcc"
//                       className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg text-sm font-medium transition-colors flex items-center"
//                     >
//                       Manage Cards <ArrowRightCircle className="ml-1 h-4 w-4" />
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Quick Tip */}
//           {!isLoading && tipOfTheDay.title && (
//             <Card className="border border-amber-100 bg-gradient-to-br from-amber-50 to-purple-50">
//               <CardHeader className="pb-2">
//                 <CardTitle className="flex items-center text-lg font-semibold text-purple-900">
//                   <LightbulbIcon className="mr-2 h-5 w-5 text-amber-500" />
//                   Tip of the Day
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <div className="p-3 rounded-lg bg-white/50 border border-amber-100">
//                   <h4 className="font-medium text-purple-900">{tipOfTheDay.title}</h4>
//                   <p className="text-sm text-purple-700 mt-1">{tipOfTheDay.content}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* System Status Feed */}
//           {!isLoading && notifications.length > 0 && (
//             <Card className="border border-purple-100">
//               <CardHeader className="pb-2">
//                 <CardTitle className="flex items-center text-lg font-semibold text-purple-900">
//                   <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
//                   System Notifications
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <div className="space-y-3">
//                   {notifications.map((notification) => (
//                     <div 
//                       key={notification.id} 
//                       className={`p-3 rounded-lg border ${
//                         notification.type === 'alert' 
//                           ? 'border-red-100 bg-red-50' 
//                           : 'border-blue-100 bg-blue-50'
//                       }`}
//                     >
//                       <div className="flex justify-between">
//                         <p className={`text-sm font-medium ${
//                           notification.type === 'alert' ? 'text-red-700' : 'text-blue-700'
//                         }`}>
//                           {notification.message}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">{formatDate(notification.date)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>

//       {/* Featured Service */}
//       <Card className="border border-amber-200 bg-gradient-to-r from-amber-50 to-purple-50 overflow-hidden relative">
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div className="max-w-xl">
//               <h3 className="text-xl font-bold text-purple-900 mb-2">Featured Service: 50% off on US Residential Proxies</h3>
//               <p className="text-purple-700 mb-4">Get our premium US residential proxies at half price until April 15. Perfect for web scraping, market research, and brand protection.</p>
//               <Link 
//                 to="/dashboard/proxies/special" 
//                 className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
//               >
//                 Learn More <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </div>
//             <div className="hidden md:block">
//               <Server className="h-24 w-24 text-purple-300 opacity-30" />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Product Showcase Carousel */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
//           <span className="mr-2">Popular PSD Templates</span>
//           <div className="h-1 flex-grow bg-gradient-to-r from-amber-300 to-transparent rounded ml-2"></div>
//         </h2>
        
//         <Carousel className="w-full">
//           <CarouselContent>
//             {Array.from({ length: 5 }).map((_, index) => (
//               <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//                 <Card className="overflow-hidden">
//                   <div className="h-40 bg-purple-100 flex items-center justify-center">
//                     <FileImage className="h-12 w-12 text-purple-300" />
//                   </div>
//                   <CardContent className="p-4">
//                     <h3 className="font-medium text-purple-900">Template {index + 1}</h3>
//                     <p className="text-sm text-purple-600">Professional design for your projects</p>
//                     <div className="flex justify-between items-center mt-2">
//                       <span className="font-bold text-purple-900">$19.99</span>
//                       <button className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
//                         Preview
//                       </button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <div className="flex justify-end gap-2 mt-2">
//             <CarouselPrevious className="static transform-none" />
//             <CarouselNext className="static transform-none" />
//           </div>
//         </Carousel>
//       </div>
      
//       {/* Services Grid */}
//       <div>
//         <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
//           <span className="mr-2">Your Services</span>
//           <div className="h-1 flex-grow bg-gradient-to-r from-amber-300 to-transparent rounded ml-2"></div>
//         </h2>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           {serviceCards.map((card, index) => (
//             <Link
//               key={card.title}
//               to={card.path}
//               className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border border-purple-50 group transform hover:-translate-y-1"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-bold text-purple-800 group-hover:text-purple-700 transition-colors">{card.title}</h3>
//                 <div className={`w-12 h-12 rounded-xl ${card.color} ${card.hoverColor} flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform`}>
//                   <card.icon className="h-6 w-6" />
//                 </div>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-sm text-purple-600 font-medium">Total Count</p>
//                   {isLoading ? (
//                     <Skeleton className="h-8 w-16" />
//                   ) : (
//                     <p className="text-3xl font-bold text-purple-900">{card.count}</p>
//                   )}
//                 </div>
//                 <span className="text-amber-500 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center">
//                   View <span className="ml-1 text-lg">→</span>
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOverview;

import { 
  Laptop, 
  Server, 
  FileImage, 
  Phone, 
  CreditCard, 
  ShoppingCart, 
  TrendingUp,
  ActivitySquare,
  Sparkles,
  ChartBar,
  Bell,
  LightbulbIcon,
  ArrowRightCircle,
  TrendingDown,
  CheckCircle2,
  HelpCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  ExternalLink,
  Clock,
  Gift
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/hooks/use-toast';

const DashboardOverview = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: 'User',
    email: 'user@example.com'
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [serviceStats, setServiceStats] = useState({
    proxies: 0,
    vps: 0,
    templates: 0,
    nonVoip: 0,
    vcc: 0,
    orders: 0
  });
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [userInsights, setUserInsights] = useState([]);

  // Updated color theme with #7d29bb as the main purple
  const theme = {
    electricPurple: '#7d29bb', // Main purple (updated)
    deepPurple: '#5d1b8f', // Darker purple (adjusted to match)
    lightPurple: '#f1e8fa', // Light purple background (adjusted to be lighter)
    gold: 'rgba(245, 158, 11, 0.7)', // Gold accent color with transparency
    lightGold: 'rgba(254, 243, 199, 0.5)', // Light gold for backgrounds with more transparency
    glassBg: 'rgba(255, 255, 255, 0.1)', // Glass effect background
    glassBorder: 'rgba(255, 255, 255, 0.2)', // Glass effect border
    textPrimary: '#1F2937', // Dark text
    textSecondary: '#6B7280', // Secondary text
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // User info
        setUserInfo({
          name: 'John Doe',
          email: 'john@example.com'
        });
        
        // Service stats
        setServiceStats({
          proxies: 0,
          vps: 0,
          templates: 5,
          nonVoip: 0,
          vcc: 2,
          orders: 1
        });

        // Trending products
        setTrendingProducts([
          { 
            id: 'trend-1', 
            name: 'US Residential Proxies', 
            category: 'proxies',
            trend: 'up',
            percent: 23
          },
          { 
            id: 'trend-2', 
            name: 'UK Static Proxies', 
            category: 'proxies',
            trend: 'up',
            percent: 17
          },
          { 
            id: 'trend-3', 
            name: 'Germany VPS Servers', 
            category: 'vps',
            trend: 'up',
            percent: 12
          }
        ]);

        // User insights
        setUserInsights([
          {
            id: 'insight-1',
            username: '@sneakerbot',
            message: 'US proxies helped me cop the latest drop!',
            likes: 24
          },
          {
            id: 'insight-2',
            username: '@dataresearcher',
            message: 'Using rotating proxies for web scraping with zero blocks.',
            likes: 18
          },
          {
            id: 'insight-3',
            username: '@marketingpro',
            message: 'VCCs are great for managing multiple ad accounts.',
            likes: 15
          }
        ]);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error Loading Dashboard",
          description: "Could not load your dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [toast]);

  // Calculate active services from service stats
  const activeServicesCount = Object.values(serviceStats).filter(count => count > 0).length;

  // Service cards data
  const serviceCards = [
    {
      title: 'Proxies',
      icon: Laptop,
      color: theme.electricPurple,
      count: serviceStats.proxies,
      path: '/dashboard/proxies',
      description: 'Secure, high-speed connections'
    },
    {
      title: 'VPS Servers',
      icon: Server,
      color: theme.deepPurple,
      count: serviceStats.vps,
      path: '/dashboard/vps',
      description: 'Powerful virtual private servers'
    },
    {
      title: 'PSD Templates',
      icon: FileImage,
      color: 'rgba(245, 158, 11, 0.5)',
      count: serviceStats.templates,
      path: '/dashboard/templates',
      description: 'Professional design templates'
    },
    {
      title: 'Non-VOIP Numbers',
      icon: Phone,
      color: theme.electricPurple,
      count: serviceStats.nonVoip,
      path: '/dashboard/nonvoip',
      description: 'Verified phone numbers'
    },
    {
      title: 'VCC Cards',
      icon: CreditCard,
      color: 'rgba(245, 158, 11, 0.5)',
      count: serviceStats.vcc,
      path: '/dashboard/vcc',
      description: 'Virtual credit cards'
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      color: theme.deepPurple,
      count: serviceStats.orders,
      path: '/dashboard/orders',
      description: 'Your purchase history'
    }
  ];

  // Tip cards
  const tipCards = [
    {
      title: 'Getting Started',
      icon: LightbulbIcon,
      content: 'New to our services? Check out our beginner guides and tutorials.',
      link: '/guides/beginner',
      color: 'rgba(245, 158, 11, 0.7)'
    },
    {
      title: 'Proxy Best Practices',
      icon: CheckCircle2,
      content: 'Learn how to maximize proxy performance and avoid common issues.',
      link: '/guides/proxies',
      color: theme.electricPurple
    },
    {
      title: 'VCC Usage Tips',
      icon: CreditCard,
      content: 'Get the most out of your virtual credit cards with these strategies.',
      link: '/guides/vcc',
      color: theme.deepPurple
    }
  ];

  // Templates data
  const templateItems = [
    {
      id: 'template-1',
      title: 'Professional Profile',
      category: 'Social Media',
      price: '$19.99',
      image: '/placeholder.svg'
    },
    {
      id: 'template-2',
      title: 'E-Commerce Store',
      category: 'Business',
      price: '$24.99',
      image: '/placeholder.svg'
    },
    {
      id: 'template-3',
      title: 'Creative Portfolio',
      category: 'Design',
      price: '$17.99',
      image: '/placeholder.svg'
    },
    {
      id: 'template-4',
      title: 'Dashboard UI',
      category: 'Web App',
      price: '$29.99',
      image: '/placeholder.svg'
    },
  ];

  // Social media data
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/exactconnect' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/exactconnect' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/exactconnect' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/exactconnect' },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 bg-gradient-to-br from-purple-50 to-violet-50">
      {/* Welcome Banner with Animation - Updated with new color scheme */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#7d29bb] to-[#9d4cce] p-6 md:p-8 shadow-lg animate-fade-in">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-amber-300/30 blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome back, {isLoading ? '...' : userInfo.name}!
            </h1>
            <p className="text-purple-100 text-sm md:text-base opacity-90">
              Here's an overview of your services and insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 animate-fade-in">
              <Clock className="h-5 w-5 text-amber-300/70" />
              <span className="text-white text-sm">Last login: Today, 10:45 AM</span>
            </div>
            <div className="relative animate-fade-in">
              <Bell className="h-6 w-6 text-purple-100 cursor-pointer hover:text-white transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 bg-amber-400/70 text-xs text-white font-medium rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </div>
          </div>
        </div>
        
        {/* Floating animated elements */}
        <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-purple-400/20 animate-bounce [animation-duration:6s]"></div>
        <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-amber-300/30 animate-ping [animation-duration:3s]"></div>
        <div className="absolute bottom-10 left-1/3 w-3 h-3 rounded-full bg-white/30 animate-ping [animation-duration:4s]"></div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats and Main Services */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Spent */}
            <div 
              className="rounded-xl p-5 border border-purple-100 bg-white/30 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              style={{ 
                background: `linear-gradient(135deg, ${theme.lightPurple}80, rgba(255,255,255,0.8))`,
                borderColor: theme.glassBorder
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-purple-700 opacity-80">Total Spent</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-20 mt-2" />
                  ) : (
                    <p className="text-2xl font-bold text-purple-900">$0.00</p>
                  )}
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#7d29bb] to-[#9d4cce] shadow-md">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-xs mt-3 text-purple-700">Track your spending history</p>
            </div>

            {/* Active Services */}
            <div 
              className="rounded-xl p-5 border border-purple-100 bg-white/30 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              style={{ 
                background: `linear-gradient(135deg, ${theme.lightPurple}80, rgba(255,255,255,0.8))`,
                borderColor: theme.glassBorder
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-purple-700 opacity-80">Active Services</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-20 mt-2" />
                  ) : (
                    <p className="text-2xl font-bold text-purple-900">{activeServicesCount} / 6</p>
                  )}
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#7d29bb] to-[#9d4cce] shadow-md">
                  <ActivitySquare className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-xs mt-3 text-purple-700">Services you're currently using</p>
            </div>

            {/* Last Activity */}
            <div 
              className="rounded-xl p-5 border border-purple-100 bg-white/30 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              style={{ 
                background: `linear-gradient(135deg, ${theme.lightPurple}80, rgba(255,255,255,0.8))`,
                borderColor: theme.glassBorder
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-purple-700 opacity-80">Last Activity</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-20 mt-2" />
                  ) : (
                    <p className="text-2xl font-bold text-purple-900">N/A</p>
                  )}
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#7d29bb] to-[#9d4cce] shadow-md">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-xs mt-3 text-purple-700">Your recent platform activity</p>
            </div>
          </div>

          {/* Getting Started Guide */}
          <Card 
            className="overflow-hidden border-0 shadow-md animate-fade-in" 
            style={{ 
              background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50/30 to-transparent pointer-events-none"></div>
            <CardHeader className="pb-2 relative">
              <CardTitle className="flex items-center text-lg font-bold text-purple-900">
                <Sparkles className="mr-2 h-5 w-5 text-amber-400/70" />
                Getting Started with ExactConnect
              </CardTitle>
              <CardDescription className="text-purple-700">
                Quick steps to maximize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-amber-100/70 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-amber-600/90 font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900">Explore Our Services</h4>
                    <p className="text-sm text-purple-700 mt-1">Browse through our proxies, VPSs, and other digital tools</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#f1e8fa] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-[#7d29bb] font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900">Complete Your Profile</h4>
                    <p className="text-sm text-purple-700 mt-1">Add payment methods and verify your contact details</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-amber-600/80 font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900">Make Your First Purchase</h4>
                    <p className="text-sm text-purple-700 mt-1">Try our proxies or VCC services to get started</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div>
            <h2 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
              <span className="mr-2">Your Services</span>
              <div className="h-0.5 flex-grow bg-gradient-to-r from-[#9d4cce] to-transparent rounded ml-2"></div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {serviceCards.map((card) => (
                <Link
                  key={card.title}
                  to={card.path}
                  className="group"
                >
                  <div 
                    className="h-full rounded-xl p-5 shadow-sm bg-white/40 backdrop-blur-md border border-white/20 hover:shadow-md transition-all duration-500 hover:bg-white/60"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.8))'
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${card.color}, ${card.color}DD)`
                        }}
                      >
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                      {card.count > 0 ? (
                        <div 
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{ 
                            background: theme.lightPurple,
                            color: theme.electricPurple
                          }}
                        >
                          {card.count} Active
                        </div>
                      ) : null}
                    </div>
                    <h3 className="font-semibold text-purple-900">{card.title}</h3>
                    <p className="text-sm text-purple-700 mt-1">{card.description}</p>
                    <div className="flex items-center justify-end mt-4">
                      <div className="text-amber-500/80 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRightCircle className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Templates Showcase */}
          <Card 
            className="overflow-hidden border-0 shadow-md animate-fade-in" 
            style={{ 
              background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-purple-900 flex items-center">
                <FileImage className="mr-2 h-5 w-5 text-amber-400/70" />
                Popular PSD Templates
              </CardTitle>
              <CardDescription className="text-purple-700">
                Professional design templates for your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templateItems.map((template) => (
                  <div 
                    key={template.id}
                    className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <AspectRatio ratio={4/3} className="bg-purple-100">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f1e8fa] to-[#f5edfb]">
                        <FileImage className="h-10 w-10 text-[#9d4cce]" />
                      </div>
                    </AspectRatio>
                    <div className="p-3">
                      <h4 className="font-medium text-purple-900 truncate">{template.title}</h4>
                      <p className="text-xs text-purple-600 mt-1">{template.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-sm text-purple-900">{template.price}</span>
                        <button className="text-xs bg-amber-100/50 text-amber-800 px-2 py-1 rounded-full hover:bg-amber-200/50 transition-colors">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link 
                  to="/dashboard/templates"
                  className="inline-flex items-center text-sm font-medium text-[#7d29bb] hover:text-[#9d4cce] transition-colors"
                >
                  View All Templates
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Insights and Tips */}
        <div className="space-y-6">
          {/* Welcome Card for New Users */}
          <Card 
            className="overflow-hidden border-0 shadow-md" 
            style={{ 
              background: `linear-gradient(135deg, #7d29bb, #9d4cce)`,
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-6 -translate-y-6"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300/20 rounded-full blur-lg transform -translate-x-4 translate-y-4"></div>
            
            <CardContent className="relative p-5">
              <div className="mb-4 flex justify-center">
                <Gift className="h-12 w-12 text-amber-300/70" />
              </div>
              <h3 className="text-center text-xl font-bold text-white mb-2">Welcome to ExactConnect</h3>
              <p className="text-center text-purple-100 text-sm mb-4">Your digital toolkit for online success</p>
              <div className="flex justify-center">
                <Link
                  to="/dashboard/welcome-tour"
                  className="px-4 py-2 bg-amber-500/70 text-white rounded-lg text-sm font-medium hover:bg-amber-600/70 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center"
                >
                  Start Tour <ArrowRightCircle className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trending Products */}
          <Card 
            className="overflow-hidden border-0 shadow-md animate-fade-in" 
            style={{ 
              background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-purple-900 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-amber-400/70" />
                Trending Services
              </CardTitle>
              <CardDescription className="text-purple-700">
                Most popular services this week
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-lg" />
                  ))
                ) : (
                  trendingProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/70 transition-all"
                    >
                      <div className="flex items-center">
                        {product.trend === 'up' ? 
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2" /> : 
                          <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className="text-purple-900 font-medium">{product.name}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        product.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.trend === 'up' ? '+' : '-'}{product.percent}%
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips & Guides */}
          <Card 
            className="overflow-hidden border-0 shadow-md animate-fade-in" 
            style={{ 
              background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-purple-900 flex items-center">
                <LightbulbIcon className="mr-2 h-5 w-5 text-amber-400/70" />
                Tips & Guides
              </CardTitle>
              <CardDescription className="text-purple-700">
                Learn how to use our services effectively
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {tipCards.map((tip, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg hover:bg-white/70 transition-all border border-white/30 group"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: tip.color + '20', color: tip.color }}
                      >
                        <tip.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900">{tip.title}</h4>
                        <p className="text-sm text-purple-700 mt-1">{tip.content}</p>
                        <Link 
                          to={tip.link}
                          className="text-xs font-medium mt-2 inline-flex items-center"
                          style={{ color: tip.color }}
                        >
                          Read More <ArrowRightCircle className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Insights */}
          <Card 
            className="overflow-hidden border-0 shadow-md animate-fade-in" 
            style={{ 
              background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-purple-900 flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-amber-400/70" />
                User Insights
              </CardTitle>
              <CardDescription className="text-purple-700">
                How others are using our services
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                  ))
                ) : (
                  userInsights.map((insight) => (
                    <div 
                      key={insight.id}
                      className="p-4 rounded-lg hover:bg-white/70 transition-all border border-white/30"
                    >
                      <p className="text-sm text-purple-900">{insight.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-purple-600 font-medium">{insight.username}</span>
                        <div className="text-xs text-amber-600/80 flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {insight.likes} likes
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Need Help Card */}
          <div 
            className="rounded-xl p-5 border shadow-md animate-fade-in overflow-hidden relative"
            style={{ 
              background: `linear-gradient(135deg, ${theme.lightGold}, rgba(255, 253, 240, 0.8))`,
              borderColor: theme.glassBorder
            }}
          >
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-amber-300/20 blur-xl"></div>
            <h3 className="font-bold text-amber-900 flex items-center">
              <HelpCircle className="h-4 w-4 mr-1.5 text-amber-500/70" />
              Need Help?
            </h3>
            <p className="text-sm text-amber-800 mt-2">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex space-x-2 mt-4">
              <Link
                to="/support/chat"
                className="px-3 py-1.5 bg-amber-500/70 text-white rounded-lg text-sm hover:bg-amber-600/70 transition-colors shadow-sm flex items-center justify-center flex-1"
              >
                Live Chat
              </Link>
              <Link
                to="/support/tickets"
                className="px-3 py-1.5 bg-white text-amber-700 border border-amber-200/70 rounded-lg text-sm hover:bg-amber-50 transition-colors shadow-sm flex items-center justify-center flex-1"
              >
                Open Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Footer */}
      <div 
        className="mt-10 pt-8 border-t border-purple-200/70 animate-fade-in"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-purple-900">Connect with ExactConnect</h3>
            <p className="text-sm text-purple-700">Follow us for news, tips, and special offers</p>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ 
                  background: social.name === 'Facebook' || social.name === 'LinkedIn' ? 
                    `linear-gradient(135deg, #7d29bb, #5d1b8f)` : 
                    social.name === 'Twitter' ? 
                      `linear-gradient(135deg, #7d29bb, #9d4cce)` : 
                      `linear-gradient(135deg, rgba(245, 158, 11, 0.5), #7d29bb)`
                }}
              >
                <social.icon className="h-5 w-5 text-white" />
              </a>
            ))}
            <a 
              href="mailto:support@exactconnect.com" 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500/70 to-amber-600/70 transition-transform hover:scale-110"
            >
              <Mail className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-purple-600">
          &copy; 2025 ExactConnect. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;