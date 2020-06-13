package be.gerard.casino.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Player {

    @Id
    private String username;

    private String firstName;

    private String lastName;

    @Setter
    private BigDecimal balance;

    @Setter
    private BigDecimal lastUsedIncrement;

}
