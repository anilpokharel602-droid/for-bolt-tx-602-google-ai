import React, { useState, useEffect } from 'react';
// FIX: Change import style for react-router-dom to work around potential module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { UserPlus, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getPatients } from '../services/backendService';
import type { Patient } from '../types';
import { PatientType } from '../types';

const PatientsTable: React.FC<{ patients: Patient[] }> = ({ patients }) => {
  const navigate = ReactRouterDOM.useNavigate();

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Age</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Blood Type</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered</th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="hover:bg-slate-50 transition-colors duration-150 group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">{patient.name}</div>
                  <div className="text-xs text-slate-500">ID: {patient.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge color={patient.type === PatientType.Donor ? 'blue' : 'green'} className="shadow-sm">{patient.type}</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{patient.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                    {patient.bloodType}
                  </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{patient.registrationDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="ghost" size="sm" onClick={() => navigate(`/patients/${patient.id}`)} className="text-primary-600 hover:text-primary-800">
                    View Details
                </Button>
              </td>
            </tr>
          ))}
          {patients.length === 0 && (
              <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                      No patients registered yet.
                  </td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const PatientsListPage: React.FC = () => {
  const navigate = ReactRouterDOM.useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Patient Directory</h1>
            <p className="text-slate-500 mt-1">Manage and track all registered donors and recipients.</p>
        </div>
        <Button onClick={() => navigate('/register')} leftIcon={<UserPlus size={18}/>} className="shadow-lg shadow-primary-500/20">
          Register New Patient
        </Button>
      </div>
      
      <Card className="border-none shadow-none bg-transparent">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                      type="text" 
                      placeholder="Search patients by name or ID..." 
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <Button variant="secondary" leftIcon={<Filter size={18}/>}>Filter</Button>
          </div>

          <CardContent className="p-0 bg-white rounded-xl shadow-sm border border-slate-200">
            {isLoading ? (
              <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-slate-500">Loading patient records...</p>
              </div>
            ) : (
              <PatientsTable patients={filteredPatients} />
            )}
          </CardContent>
      </Card>
    </div>
  );
};

export default PatientsListPage;