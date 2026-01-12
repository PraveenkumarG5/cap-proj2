import React, { useState } from 'react';
import type { Account } from '../services/api';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | null;
    account: Account | null;
    onSubmit: (amount: number, targetAccountId?: number) => Promise<void>;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, type, account, onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [targetId, setTargetId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen || !type || !account) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) {
            setError("Please enter a valid positive amount");
            setLoading(false);
            return;
        }

        try {
            await onSubmit(val, targetId ? parseInt(targetId) : undefined);
            onClose();
            setAmount('');
            setTargetId('');
        } catch (err: any) {
            // Error handling usually happens in parent or here
            // If parent throws, we catch here
            let msg = "Transaction failed";
            if (err.response?.data) {
                if (typeof err.response.data === 'string') {
                    msg = err.response.data;
                } else if (typeof err.response.data === 'object') {
                    // Combine all error messages
                    msg = Object.values(err.response.data).join(', ');
                }
            } else if (err.message) {
                msg = err.message;
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
                <h2 className="text-2xl font-bold mb-4 capitalize text-slate-800">{type.toLowerCase()}</h2>

                <div className="mb-4 p-3 bg-slate-50 rounded border border-slate-100">
                    <p className="text-sm text-slate-500">Account #{account.accountId}</p>
                    <p className="font-mono text-xl text-slate-700">${account.balance.toFixed(2)}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === 'TRANSFER' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Target Account ID</label>
                            <input
                                type="number"
                                value={targetId}
                                onChange={e => setTargetId(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Destination Acct ID"
                                autoFocus
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="0.00"
                            autoFocus={type !== 'TRANSFER'}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Confirm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
