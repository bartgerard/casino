package be.gerard.casino;

import be.gerard.casino.config.AsyncConfig;
import be.gerard.casino.config.JpaConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({
        JpaConfig.class,
        AsyncConfig.class
})
public class CasinoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CasinoApplication.class, args);
    }

}
