package be.gerard.casino.web;

import be.gerard.casino.model.Player;
import be.gerard.casino.model.PlayerChanged;
import be.gerard.casino.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@Transactional
@RestController
@RequestMapping("api/players")
@RequiredArgsConstructor
public class PlayerRestController {

    private final ApplicationEventPublisher eventPublisher;

    private final PlayerRepository playerRepository;

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
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
