package be.gerard.casino.web;

import be.gerard.casino.model.Player;
import be.gerard.casino.model.PlayerChanged;
import be.gerard.casino.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RestController
@RequestMapping("api/players")
@RequiredArgsConstructor
public class PlayerRestController {

    private final ApplicationEventPublisher eventPublisher;

    private final PlayerRepository playerRepository;

    @GetMapping("{username}")
    public Player findPlayerByUsername(
            @PathVariable("username") final String username
    ) {
        return playerRepository.findById(username)
                .orElseThrow(() -> new IllegalArgumentException("player not found [username=" + username + "]"));
    }

    @GetMapping
    public List<Player> findAllPlayers() {
        return playerRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Player::getBalance, Comparator.reverseOrder())
                        .thenComparing(Player::getFirstName)
                        .thenComparing(Player::getLastName)
                )
                .collect(Collectors.toList());
    }

    @GetMapping("put")
    public void addPlayer() {
        playerRepository.save(Player.builder()
                .username("bart.gerard")
                .firstName("Bart")
                .lastName("Gerard")
                .balance(BigDecimal.TEN)
                .build()
        );
    }

    @PutMapping
    public void savePlayer(
            @RequestBody final Player player
    ) {
        playerRepository.save(player);
        eventPublisher.publishEvent(new PlayerChanged());
    }

}
