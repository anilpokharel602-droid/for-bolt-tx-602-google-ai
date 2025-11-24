import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, GitCommitHorizontal, CheckCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { getPatients, getPairs } from '../services/backendService';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  isLoading?: boolean;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, isLoading, trend }) => (
  <Card className="hover:border-primary-200 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-none">
      <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</CardTitle>
      <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
        {icon}
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      {isLoading ? (
        <div className="h-8 bg-slate-100 rounded animate-pulse w-1/2"></div>
      ) : (
        <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            {trend && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{trend}</span>}
        </div>
      )}
      <p className="text-xs text-slate-500 mt-1 font-medium">{description}</p>
    </CardContent>
  </Card>
);

const completionRates = [
  { name: 'Phase 1', completed: 80, in_progress: 20 },
  { name: 'Phase 2', completed: 65, in_progress: 25 },
  { name: 'Phase 3', completed: 50, in_progress: 15 },
  { name: 'Phase 4', completed: 30, in_progress: 10 },
  { name: 'Phase 5', completed: 15, in_progress: 5 },
];

const DashboardPage: React.FC = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [activePairs, setActivePairs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // These are simulated values
  const completedEvaluations = 2; 
  const averageDays = 95;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [patients, pairs] = await Promise.all([getPatients(), getPairs()]);
        setTotalPatients(patients.length);
        setActivePairs(pairs.length);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Real-time overview of transplant evaluation metrics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value={totalPatients.toString()} icon={<Users className="h-5 w-5" />} description="Registered Donors & Recipients" isLoading={isLoading} trend="+12%"/>
        <StatCard title="Active Pairs" value={activePairs.toString()} icon={<GitCommitHorizontal className="h-5 w-5" />} description="Linked Donor-Recipient Pairs" isLoading={isLoading} trend="+5%" />
        <StatCard title="Completed Evals" value={completedEvaluations.toString()} icon={<CheckCircle className="h-5 w-5" />} description="Successfully cleared for surgery" />
        <StatCard title="Avg. Eval Time" value={`${averageDays} days`} icon={<Clock className="h-5 w-5" />} description="Mean time to clearance" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evaluation Phase Progress</CardTitle>
            <CardDescription>Workflow bottleneck analysis across active patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionRates} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ fill: '#f1f5f9' }}
                />
                <Legend iconType="circle" />
                {/* Updated Colors to match new Indigo/Teal theme */}
                <Bar dataKey="completed" stackId="a" fill="#4f46e5" name="Completed (%)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="in_progress" stackId="a" fill="#c7d2fe" name="In Progress (%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="relative border-l border-slate-200 ml-3 space-y-6">
              <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full ring-4 ring-white">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">John Doe completed Phase 1</p>
                  <p className="text-xs text-slate-500 mt-0.5">2 hours ago</p>
                </div>
              </li>
              <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-4 ring-white">
                    <GitCommitHorizontal className="w-3 h-3 text-blue-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">New pair created: Smith/Doe</p>
                  <p className="text-xs text-slate-500 mt-0.5">1 day ago</p>
                </div>
              </li>
               <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full ring-4 ring-white">
                     <Users className="w-3 h-3 text-primary-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">New patient: Emily White</p>
                  <p className="text-xs text-slate-500 mt-0.5">3 days ago</p>
                </div>
              </li>
                 <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full ring-4 ring-white">
                    <Clock className="w-3 h-3 text-yellow-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">R. Johnson started Phase 1</p>
                  <p className="text-xs text-slate-500 mt-0.5">4 days ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;