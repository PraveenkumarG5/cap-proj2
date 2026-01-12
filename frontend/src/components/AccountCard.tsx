import React from 'react';
import type { Account } from '../services/api';

interface AccountCardProps {
    account: Account;
    onDeposit: (account: Account) => void;
    onWithdraw: (account: Account) => void;
    onTransfer: (account: Account) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onDeposit, onWithdraw, onTransfer }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-500">Account #{account.accountId}</span>
                <span className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600' : 'text-slate-800'}`}>
                    ${account.balance.toFixed(2)}
                </span>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onDeposit(account)}
                    className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg font-medium hover:bg-green-100 transition"
                >
                    Deposit
                </button>
                <button
                    onClick={() => onWithdraw(account)}
                    className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg font-medium hover:bg-red-100 transition"
                >
                    Withdraw
                </button>
                <button
                    onClick={() => onTransfer(account)}
                    className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
                >
                    Transfer
                </button>
            </div>
        </div>
    );
};

export default AccountCard;
