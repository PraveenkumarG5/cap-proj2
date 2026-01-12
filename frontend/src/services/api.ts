import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    address: string;
    accounts?: Account[];
}

export interface Account {
    accountId: number;
    balance: number;
    version: number;
    // customer is not included due to @JsonIgnore, which is fine
}

export interface Transaction {
    transactionId: number;
    amount: number;
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER_IN' | 'TRANSFER_OUT';
    timestamp: string;
}

export const searchCustomers = async (name: string) => {
    const response = await api.get<Customer[]>(`/customers?name=${name}`);
    return response.data;
};

export const getCustomer = async (id: number) => {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
};

export const getCustomerAccounts = async (customerId: number) => {
    // Current backend doesn't have /customers/{id}/accounts directly?
    // AccountRepository has findByCustomerCustomerId.
    // I didn't verify if I exposed it.
    // I exposed getCustomer(id) which returns Customer.
    // Does Customer have `accounts` list?
    // Entity has @OneToMany. I did NOT put @JsonIgnore on it.
    // So getCustomer(id) should return customer with accounts.
    // Check Customer.java:
    // public List<Account> getAccounts() { return accounts; }
    // BUT mappedBy="customer".
    // Lazy loading? FetchType.LAZY.
    // Jackson will fail on Lazy loading if session closed, OR return null/empty.
    // I should probably set FetchType.EAGER for this simple app or use `@Transactional` in controller/Service to keep session open?
    // Controller calls repository.findById. Repo returns entity.
    // If I access `getAccounts` inside controller it might fetch.
    // But default Jackson serialization happens after controller returns?
    // Spring Boot usually needs `spring.jackson.serialization.fail-on-empty-beans=false` or `Hibernate5Module`.
    // I'll add a specific endpoint for accounts or modify `CustomerController`.
    // For now I'll assume it might be included or I need to fetch separately.
    // I'll add `getAccounts` to `CustomerController` or explicitly fetch it.

    // Simplest: `CustomerController` returns `Customer`. `Customer` has `accounts`.
    // I'll update `CustomerController` to force fetch or change FetchType.
    // I'll change `Customer.java` to FetchType.EAGER for simplicity?
    // Or I'll add `getAccounts` endpoint.

    const response = await api.get<Customer>(`/customers/${customerId}`);
    return response.data;
};

export const deposit = async (accountId: number, amount: number) => {
    const response = await api.post<Account>('/transactions/deposit', { accountId, amount });
    return response.data;
};

export const withdraw = async (accountId: number, amount: number) => {
    const response = await api.post<Account>('/transactions/withdraw', { accountId, amount });
    return response.data;
};

export const transfer = async (fromAccountId: number, toAccountId: number, amount: number) => {
    const response = await api.post('/transactions/transfer', { fromAccountId, toAccountId, amount });
    return response.data;
};

export default api;
