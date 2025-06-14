import React, { useState } from 'react';
import { 
  MdPeople, 
  MdCheckCircle, 
  MdRemoveCircle, 
  MdNotifications, 
  MdPlaylistAddCheck, 
  MdAddCircle 
} from 'react-icons/md';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Pending';
}

const defaultUsername = 'admin';
const defaultPassword = 'password123';

const StaffManagement: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [staffList, setStaffList] = useState<StaffMember[]>([
    { id: 1, name: 'Alice Johnson', role: 'Teacher', status: 'Active' },
    { id: 2, name: 'Bob Smith', role: 'Administrator', status: 'On Leave' },
    { id: 3, name: 'Clara Davis', role: 'Counselor', status: 'Active' },
    { id: 4, name: 'David Wilson', role: 'Teacher', status: 'Pending' },
  ]);

  const totalStaff = staffList.length;
  const activeStaff = staffList.filter(s => s.status === 'Active').length;
  const onLeaveStaff = staffList.filter(s => s.status === 'On Leave').length;
  const pendingStaff = staffList.filter(s => s.status === 'Pending').length;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === defaultUsername && password === defaultPassword) {
      setAuthenticated(true);
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleAddStaff = () => {
    const newId = staffList.length ? Math.max(...staffList.map(s => s.id)) + 1 : 1;
    const newStaff: StaffMember = {
      id: newId,
      name: `New Staff ${newId}`,
      role: 'Role',
      status: 'Pending',
    };
    setStaffList(prev => [...prev, newStaff]);
  };

  const handleRemoveStaff = (id: number) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {!authenticated ? (
        // Login Screen
        <div className="flex flex-col justify-center items-center min-h-screen px-6 py-12 max-w-md mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">Staff Management Login</h1>
          <form className="w-full bg-gray-50 rounded-lg shadow-md p-8" onSubmit={handleLoginSubmit} noValidate>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                aria-invalid={!!loginError}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                aria-invalid={!!loginError}
              />
            </div>
            {loginError && (
              <p className="mb-4 text-red-600 font-medium" role="alert" aria-live="assertive">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-gray-900 transition-colors"
              aria-label="Log in"
            >
              Log In
            </button>
            <p className="mt-4 text-center text-gray-600 text-sm">
              Default credentials: <br />
              Username: <code className="bg-gray-200 px-2 py-1 rounded text-sm">admin</code><br />
              Password: <code className="bg-gray-200 px-2 py-1 rounded text-sm">password123</code>
            </p>
          </form>
        </div>
      ) : (
        // Staff Management Dashboard
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
          {/* Header */}
          <header className="flex justify-between items-center mb-12 sticky top-0 bg-white py-6 z-20 shadow-sm rounded-md">
            <h1 className="text-4xl font-extrabold text-gray-900">Staff Management</h1>
            <button
              onClick={() => setAuthenticated(false)}
              className="px-4 py-2 font-semibold rounded-md bg-gray-200 hover:bg-gray-300 transition"
              aria-label="Log out"
            >
              Log Out
            </button>
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-lg shadow p-6 flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <MdPeople className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Total Staff</p>
                <p className="text-3xl font-bold text-gray-900">{totalStaff}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-6 flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <MdCheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Active Staff</p>
                <p className="text-3xl font-bold text-gray-900">{activeStaff}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-6 flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <MdPlaylistAddCheck className="w-8 h-8 text-yellow-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Pending Staff</p>
                <p className="text-3xl font-bold text-gray-900">{pendingStaff}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow p-6 flex items-center">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <MdRemoveCircle className="w-8 h-8 text-red-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">On Leave</p>
                <p className="text-3xl font-bold text-gray-900">{onLeaveStaff}</p>
              </div>
            </div>
          </section>

          {/* Staff List and Actions */}
          <section className="bg-gray-50 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <MdPeople className="w-6 h-6 mr-2" aria-hidden="true" /> Manage Staff
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200 rounded-md">
                <thead className="bg-white sticky top-0">
                  <tr>
                    <th className="border border-gray-300 text-left px-4 py-3">Name</th>
                    <th className="border border-gray-300 text-left px-4 py-3">Role</th>
                    <th className="border border-gray-300 text-left px-4 py-3">Status</th>
                    <th className="border border-gray-300 text-center px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((staff) => (
                    <tr key={staff.id} className="bg-white hover:bg-gray-100 transition">
                      <td className="border border-gray-300 px-4 py-3">{staff.name}</td>
                      <td className="border border-gray-300 px-4 py-3">{staff.role}</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span
                          className={
                            staff.status === 'Active'
                              ? 'text-green-700 font-semibold'
                              : staff.status === 'Pending'
                              ? 'text-yellow-700 font-semibold'
                              : 'text-red-700 font-semibold'
                          }
                        >
                          {staff.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <button
                          onClick={() => handleRemoveStaff(staff.id)}
                          aria-label={`Remove ${staff.name}`}
                          className="text-red-600 hover:underline font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {staffList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                        No staff members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddStaff}
              className="mt-6 inline-flex items-center px-5 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-900 transition"
              aria-label="Add new staff member"
            >
              <MdAddCircle className="w-5 h-5 mr-2" aria-hidden="true" />
              Add New Staff
            </button>
          </section>

          {/* Notifications */}
          <section aria-label="Notifications" className="bg-gray-50 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <MdNotifications className="w-6 h-6 mr-2" aria-hidden="true" /> Recent Notifications
            </h2>
            <ul className="space-y-4">
              <li className="p-4 bg-white rounded-md shadow-sm flex items-start gap-4">
                <div className="text-green-600">
                  <MdCheckCircle className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">New staff member added: Emily Carter</p>
                  <p className="text-gray-500 text-sm">10 minutes ago</p>
                </div>
              </li>
              <li className="p-4 bg-white rounded-md shadow-sm flex items-start gap-4">
                <div className="text-yellow-600">
                  <MdPlaylistAddCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Staff leave request pending approval</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </li>
              <li className="p-4 bg-white rounded-md shadow-sm flex items-start gap-4">
                <div className="text-red-600">
                  <MdRemoveCircle className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Staff member Bob Smith is on leave</p>
                  <p className="text-gray-500 text-sm">1 day ago</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;

