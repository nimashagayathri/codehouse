import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAuditLogs } from '../api';

function AdminAuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const data = await getAuditLogs();
            if (Array.isArray(data)) {
                setLogs(data);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const d = new Date(dateString);
        return d.toLocaleString();
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="admin" />

            <div className="flex-1 p-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">System Monitoring</h2>
                        <p className="text-slate-400 mt-1">Audit logs and activity tracking across the platform.</p>
                    </div>
                    <button
                        onClick={fetchLogs}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 shadow-sm transition font-medium text-sm"
                    >
                        Refresh Logs
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="p-6 overflow-x-auto">
                        {loading ? (
                            <div className="text-center py-10 text-slate-500 font-medium">Loading audit logs...</div>
                        ) : logs.length === 0 ? (
                            <div className="text-center py-10 text-slate-500 font-medium">No activity recorded yet.</div>
                        ) : (
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="pb-3 text-slate-400 font-medium">Date & Time</th>
                                        <th className="pb-3 text-slate-400 font-medium">Admin User</th>
                                        <th className="pb-3 text-slate-400 font-medium">Action</th>
                                        <th className="pb-3 text-slate-400 font-medium">Target Entity</th>
                                        <th className="pb-3 text-slate-400 font-medium">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log?.id || Math.random()} className="border-b border-slate-50 hover:bg-slate-50 transition p-2">
                                            <td className="py-4 text-slate-500 font-mono text-xs whitespace-nowrap">{formatDate(log?.createdAt)}</td>
                                            <td className="py-4 font-medium text-slate-700">
                                                {log?.userName || 'System'}
                                            </td>
                                            <td>
                                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    {log?.action || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="text-slate-500 font-medium">
                                                {log?.entityName || 'N/A'} {log?.entityId ? `#${log.entityId}` : ''}
                                            </td>
                                            <td className="text-slate-500 max-w-xs truncate" title={log?.details}>
                                                {log?.details || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAuditLogs;
