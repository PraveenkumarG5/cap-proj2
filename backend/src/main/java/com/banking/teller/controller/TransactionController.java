package com.banking.teller.controller;

import com.banking.teller.dto.TransactionRequest;
import com.banking.teller.dto.TransferRequest;
import com.banking.teller.entity.Account;
import com.banking.teller.service.BankingService;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final BankingService bankingService;

    public TransactionController(BankingService bankingService) {
        this.bankingService = bankingService;
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@jakarta.validation.Valid @RequestBody TransactionRequest request) {
        try {
            Account updated = bankingService.deposit(request.getAccountId(), request.getAmount());
            return ResponseEntity.ok(updated);
        } catch (ObjectOptimisticLockingFailureException e) {
            return ResponseEntity.status(409)
                    .body("Concurrency conflict: The account was modified by another transaction. Please refresh.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@jakarta.validation.Valid @RequestBody TransactionRequest request) {
        try {
            Account updated = bankingService.withdraw(request.getAccountId(), request.getAmount());
            return ResponseEntity.ok(updated);
        } catch (ObjectOptimisticLockingFailureException e) {
            return ResponseEntity.status(409)
                    .body("Concurrency conflict: The account was modified by another transaction. Please refresh.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@jakarta.validation.Valid @RequestBody TransferRequest request) {
        try {
            bankingService.transfer(request.getFromAccountId(), request.getToAccountId(), request.getAmount());
            return ResponseEntity.ok("Transfer successful");
        } catch (ObjectOptimisticLockingFailureException e) {
            return ResponseEntity.status(409).body(
                    "Concurrency conflict: One of the accounts was modified by another transaction. Please refresh.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
