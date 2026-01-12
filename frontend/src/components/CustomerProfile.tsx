import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomer, deposit, withdraw, transfer, type Customer, type Account } from '../services/api';
import AccountCard from './AccountCard';
import TransactionModal from './TransactionModal';

const CustomerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    const loadData = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const data = await getCustomer(parseInt(id));
            setCustomer(data);
        } catch (err) {
            console.error("Failed to load customer", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleAction = (type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER', account: Account) => {
        setModalType(type);
        setSelectedAccount(account);
        setModalOpen(true);
    };

    const handleTransactionSubmit = async (amount: number, targetId?: number) => {
        if (!selectedAccount) return;

        if (modalType === 'DEPOSIT') {
            await deposit(selectedAccount.accountId, amount);
        } else if (modalType === 'WITHDRAWAL') {
            await withdraw(selectedAccount.accountId, amount);
        } else if (modalType === 'TRANSFER') {
            if (!targetId) throw new Error("Target account ID required");
            await transfer(selectedAccount.accountId, targetId, amount);
        }

        await loadData(); // Refresh to catch updates (optimistic locking check happens on backend)
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!customer) return <div className="p-8 text-center">Customer not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button onClick={() => navigate('/')} className="mb-4 text-blue-600 hover:underline">
                &larr; Back to Search
            </button>

            <header className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
                <h1 className="text-3xl font-bold text-slate-900">{customer.firstName} {customer.lastName}</h1>
                <p className="text-slate-500">{customer.address}</p>
                <div className="mt-2 text-xs text-slate-400 font-mono">ID: {customer.customerId}</div>
            </header>

            <h2 className="text-xl font-semibold mb-4 text-slate-800">Accounts</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {customer.accounts && customer.accounts.length > 0 ? (
                    customer.accounts.map(acct => (
                        <AccountCard
                            key={acct.accountId}
                            account={acct}
                            onDeposit={(a) => handleAction('DEPOSIT', a)}
                            onWithdraw={(a) => handleAction('WITHDRAWAL', a)}
                            onTransfer={(a) => handleAction('TRANSFER', a)}
                        />
                    ))
                ) : (
                    <p className="text-slate-500">No accounts found.</p>
                )}
            </div>

            <TransactionModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                type={modalType}
                account={selectedAccount}
                onSubmit={handleTransactionSubmit}
            />
        </div>
    );
};

export default CustomerProfile;
