import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { LogOut } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  // Add other fields from your contact schema
  [key: string]: any;
}

export function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_, setLocation] = useLocation();

  // Check if already authenticated on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
    if (!isAuthenticated) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    const fetchWaitlist = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/contacts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setEntries(data.data);
        } else {
          throw new Error(data.message || 'Failed to load waitlist');
        }
      } catch (err) {
        console.error('Error fetching waitlist:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    window.location.href = '/admin';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading waitlist entries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Waitlist</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get all unique field names from entries
  const allFields = new Set<string>();
  entries.forEach(entry => {
    Object.keys(entry).forEach(key => {
      if (key !== 'id' && key !== 'createdAt') {
        allFields.add(key);
      }
    });
  });
  const fieldNames = Array.from(allFields);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Waitlist Entries</h1>
            <p className="text-gray-600">
              Total: <span className="font-semibold">{entries.length}</span> signups
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
            <button
              onClick={() => setLocation('/')}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              ← Back to Site
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  {['Name', 'Email', ...fieldNames, 'Signed Up'].map((field) => (
                    <th
                      key={field}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry, index) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {entry.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{entry.email}</div>
                    </td>
                    {fieldNames
                      .filter(field => field !== 'name' && field !== 'email')
                      .map((field) => (
                        <td key={`${entry.id}-${field}`} className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {entry[field] ? String(entry[field]) : 'N/A'}
                          </div>
                        </td>
                      ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {entries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No waitlist entries found.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div>
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{entries.length}</span> of{' '}
            <span className="font-medium">{entries.length}</span> entries
          </div>
          <div className="flex space-x-2">
            <button
              disabled
              className="px-3 py-1 border rounded-md text-gray-400 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1 border rounded-md text-gray-400 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
