-- Seeding Customers
INSERT INTO customers (first_name, last_name, address) VALUES ('Alice', 'Smith', '123 Main St, NY');
INSERT INTO customers (first_name, last_name, address) VALUES ('Bob', 'Jones', '456 Oak Ave, CA');
INSERT INTO customers (first_name, last_name, address) VALUES ('Charlie', 'Brown', '789 Pine Ln, TX');

-- Seeding Accounts (Assuming IDs 1, 2, 3 generated above)
INSERT INTO accounts (balance, customer_id, version) VALUES (1000.00, 1, 0);
INSERT INTO accounts (balance, customer_id, version) VALUES (5000.50, 1, 0);
INSERT INTO accounts (balance, customer_id, version) VALUES (250.00, 2, 0);
