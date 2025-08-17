import { redirect } from 'next/navigation';
import { requireAdmin } from '../lib/auth';
import { createClient } from '../lib/supabase/server';

export default async function AdminPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect('/login');
  }

  const supabase = createClient();
  
  // Fetch statistics
  const [
    { count: totalUsers },
    { count: activeSubscriptions },
    { count: totalLessons },
    { data: recentUsers }
  ] = await Promise.all([
    supabase.from('User').select('*', { count: 'exact', head: true }),
    supabase.from('Subscription').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('DailyLesson').select('*', { count: 'exact', head: true }),
    supabase.from('User').select('*').order('createdAt', { ascending: false }).limit(10)
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-mono mb-8">Admin Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</h3>
            <p className="mt-2 text-3xl font-bold font-mono">{totalUsers || 0}</p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Subscriptions</h3>
            <p className="mt-2 text-3xl font-bold font-mono">{activeSubscriptions || 0}</p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Daily Lessons</h3>
            <p className="mt-2 text-3xl font-bold font-mono">{totalLessons || 0}</p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold font-mono">Recent Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers?.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Day {user.currentDay} / 30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.totalXP} XP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-lg font-bold font-mono mb-4">Database Management</h3>
            <div className="space-y-2">
              <a href="/admin/seed" className="block text-blue-600 hover:underline">→ Run Seed Script</a>
              <a href="/admin/users" className="block text-blue-600 hover:underline">→ Manage Users</a>
              <a href="/admin/content" className="block text-blue-600 hover:underline">→ Manage Daily Content</a>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-lg font-bold font-mono mb-4">System Status</h3>
            <div className="space-y-2 text-sm">
              <p>✅ Database Connected</p>
              <p>✅ Email Service: GoDaddy SMTP</p>
              <p>✅ Payment: Razorpay (LIVE mode)</p>
              <p>⚠️ RLS Policies: Check Supabase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}