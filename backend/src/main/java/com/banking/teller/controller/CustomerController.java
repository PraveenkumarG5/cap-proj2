package com.banking.teller.controller;

import com.banking.teller.entity.Customer;
import com.banking.teller.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Customer> search(@RequestParam(required = false, defaultValue = "") String name) {
        if (name == null || name.isEmpty()) {
            return customerRepository.findAll();
        }
        return customerRepository.findByLastNameContainingIgnoreCase(name);
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
    }
}
