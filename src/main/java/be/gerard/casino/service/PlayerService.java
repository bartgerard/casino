package be.gerard.casino.service;

import be.gerard.casino.event.MoneyTransferred;
import be.gerard.casino.event.PlayerChanged;
import be.gerard.casino.model.Player;
import be.gerard.casino.model.Transfer;
import be.gerard.casino.repository.PlayerRepository;
import be.gerard.casino.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PlayerService {

    private final ApplicationEventPublisher eventPublisher;

    private final PlayerRepository playerRepository;
    private final TransferRepository transferRepository;

    public Optional<Player> findById(
            final String username
    ) {
        return playerRepository.findById(username);
    }

    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    public void save(
            final Player player
    ) {
        playerRepository.save(player);
        eventPublisher.publishEvent(new PlayerChanged());
    }

    @EventListener
    public void handle(
            final MoneyTransferred event
    ) {
        final Player player = playerRepository.findById(event.getUsername())
                .orElseThrow(IllegalArgumentException::new);

        final List<Transfer> transfers = transferRepository.findAllByUsername(
                event.getUsername()
        );

        final BigDecimal balance = transfers.stream()
                .map(Transfer::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        player.setBalance(balance);

        final BigDecimal lastUsedIncrement = transfers.stream()
                .max(Comparator.comparing(Transfer::getTimestamp))
                .map(Transfer::getIncrement)
                .orElse(BigDecimal.ZERO);

        player.setLastUsedIncrement(lastUsedIncrement);

        eventPublisher.publishEvent(new PlayerChanged());
    }

}
