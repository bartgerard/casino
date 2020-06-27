package be.gerard.casino.web;

import be.gerard.casino.model.OrderBy;
import be.gerard.casino.model.Player;
import be.gerard.casino.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/players")
@RequiredArgsConstructor
public class PlayerRestController {

    private final PlayerService playerService;

    @GetMapping("{username}")
    public Player findPlayerByUsername(
            @PathVariable("username") final String username
    ) {
        return playerService.findById(username)
                .orElseThrow(() -> new IllegalArgumentException("player not found [username=" + username + "]"));
    }

    @GetMapping
    public List<Player> findAllPlayers(
            @RequestParam(value = "orderBy", required = false, defaultValue = "SCORE") final OrderBy orderBy
    ) {
        if (orderBy == OrderBy.NAME) {
            return playerService.findAll()
                    .stream()
                    .sorted(Comparator.comparing(Player::getFirstName)
                            .thenComparing(Player::getLastName)
                    )
                    .collect(Collectors.toList());
        }

        return playerService.findAll()
                .stream()
                .sorted(Comparator.comparing(Player::getBalance, Comparator.reverseOrder())
                        .thenComparing(Player::getFirstName)
                        .thenComparing(Player::getLastName)
                )
                .collect(Collectors.toList());
    }

    @PutMapping
    public void savePlayer(
            @RequestBody final Player player
    ) {
        playerService.add(player);
    }

    @DeleteMapping("{username}")
    public void savePlayer(
            @PathVariable("username") final String username
    ) {
        playerService.removeById(username);
    }

}
