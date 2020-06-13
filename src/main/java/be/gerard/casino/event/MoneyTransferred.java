package be.gerard.casino.event;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class MoneyTransferred {
    String username;
}
