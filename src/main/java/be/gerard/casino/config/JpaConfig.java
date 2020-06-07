package be.gerard.casino.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
        basePackages = "be.gerard.casino.repository"
)
@EntityScan(
        basePackages = "be.gerard.casino.model"
)
public class JpaConfig {
}
