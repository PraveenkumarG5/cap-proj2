package com.banking.teller.dto;

import java.math.BigDecimal;

public class TransferRequest {
    @jakarta.validation.constraints.NotNull(message = "Source Account ID is required")
    private Long fromAccountId;

    @jakarta.validation.constraints.NotNull(message = "Destination Account ID is required")
    private Long toAccountId;

    @jakarta.validation.constraints.NotNull(message = "Amount is required")
    @jakarta.validation.constraints.Positive(message = "Amount must be positive")
    @jakarta.validation.constraints.Digits(integer = 13, fraction = 2, message = "Amount exceeds the maximum limit (13 digits before decimal, 2 after)")
    private BigDecimal amount;

    public Long getFromAccountId() {
        return fromAccountId;
    }

    public void setFromAccountId(Long fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public Long getToAccountId() {
        return toAccountId;
    }

    public void setToAccountId(Long toAccountId) {
        this.toAccountId = toAccountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
