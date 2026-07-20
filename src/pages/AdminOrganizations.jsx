import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getOrganizations, createOrganization, deleteOrganization } from '../api';

function AdminOrganizations() {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', domain: '', logoUrl: '' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        setLoading(true);
        try {
            const data = await getOrganizations();
            if (Array.isArray(data)) {
                setOrganizations(data);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!formData.name) return alert('Organization name is required');
        try {
            const res = await createOrganization(formData);
            if (res.id) {
                setOrganizations([res, ...organizations]);
                setShowModal(false);
                setFormData({ name: '', domain: '', logoUrl: '' });
            }
        } catch (err) {
            alert('Failed to create organization');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this organization?')) return;
        try {
            await deleteOrganization(id);
            setOrganizations(organizations.filter(o => o.id !== id));
        } catch (err) {
            alert('Failed to delete organization');
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="admin" />

            <div className="flex-1 p-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Organizations</h2>
                        <p className="text-slate-400 mt-1">Manage partner companies and departments.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition font-semibold"
                    >
                        + Add Organization
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-10 text-slate-500 font-medium">Loading organizations...</div>
                        ) : organizations.length === 0 ? (
                            <div className="text-center py-10 text-slate-500 font-medium">No organizations found. Add one to get started.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {organizations.map((org) => (
                                    <div key={org.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition bg-white group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl overflow-hidden shadow-sm">
                                                {org.logoUrl ? <img src={org.logoUrl} alt="Logo" className="w-full h-full object-cover" /> : org.name.charAt(0).toUpperCase()}
                                            </div>
                                            <button
                                                onClick={() => handleDelete(org.id)}
                                                className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                                                title="Delete Organization"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-800">{org.name}</h3>
                                        <p className="text-slate-500 text-sm mt-1">{org.domain || 'No domain verified'}</p>
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-400 font-medium">
                                            <span>Joined {new Date(org.createdAt).toLocaleDateString()}</span>
                                            <span>ID: #{org.id}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-800">Add New Organization</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-blue-500"
                                        placeholder="e.g. CodeHouse Inc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Domain</label>
                                    <input
                                        type="text"
                                        value={formData.domain}
                                        onChange={e => setFormData({ ...formData, domain: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-blue-500"
                                        placeholder="e.g. codehouse.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
                                    <input
                                        type="url"
                                        value={formData.logoUrl}
                                        onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                                        className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-blue-500"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex gap-3">
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                                    Create Organization
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-200 transition">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminOrganizations;
