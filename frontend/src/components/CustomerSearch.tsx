import React, { useState } from 'react';
import { searchCustomers, type Customer } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CustomerSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await searchCustomers(query);
            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Teller <span className="text-blue-600">360</span></h1>

            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by Last Name..."
                    className="flex-1 p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="grid gap-4">
                {results.map(cust => (
                    <div
                        key={cust.customerId}
                        onClick={() => navigate(`/customer/${cust.customerId}`)}
                        className="bg-white p-4 rounded-lg shadow border border-slate-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-bold text-slate-800">{cust.firstName} {cust.lastName}</h3>
                        <p className="text-slate-500">{cust.address}</p>
                    </div>
                ))}
                {results.length === 0 && !loading && <div className="text-center text-slate-400">No customers found</div>}
            </div>
        </div>
    );
};

export default CustomerSearch;
