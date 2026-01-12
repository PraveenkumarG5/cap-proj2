package com.banking.teller.dto;

import java.math.BigDecimal;

public class TransactionRequest {
    @jakarta.validation.constraints.NotNull(message = "Account ID is required")
    private Long accountId;

    @jakarta.validation.constraints.NotNull(message = "Amount is required")
    @jakarta.validation.constraints.Positive(message = "Amount must be positive")
    @jakarta.validation.constraints.Digits(integer = 13, fraction = 2, message = "Amount exceeds the maximum limit (13 digits before decimal, 2 after)")
    private BigDecimal amount;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
