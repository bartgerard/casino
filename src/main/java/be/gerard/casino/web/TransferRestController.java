package be.gerard.casino.web;

import be.gerard.casino.event.MoneyTransferred;
import be.gerard.casino.model.Transfer;
import be.gerard.casino.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/transfers")
@RequiredArgsConstructor
public class TransferRestController {

    private final ApplicationEventPublisher eventPublisher;

    private final TransferRepository transferRepository;

    @PostMapping
    public void addTransaction(
            @RequestBody final Transfer transfer
    ) {
        transferRepository.save(transfer);
        eventPublisher.publishEvent(MoneyTransferred.builder()
                .username(transfer.getUsername())
                .build()
        );
    }

    @GetMapping("by-username/{username}")
    public List<Transfer> findAllTransfersByUsername(
            @PathVariable("username") final String username
    ) {
        return transferRepository.findAllByUsernameOrderByTimestampDesc(
                username
        );
    }

    @GetMapping("by-username/{username}/sliced")
    public Slice<Transfer> findTransfersByUsername(
            @PathVariable("username") final String username,
            @RequestParam("page") final int page,
            @RequestParam("size") final int size
    ) {
        return transferRepository.findAllByUsernameOrderByTimestampDesc(
                username,
                PageRequest.of(
                        page,
                        size
                )
        );
    }

    @DeleteMapping("/{username}/{id}")
    public void deleteTransfer(
            @PathVariable("username") final String username,
            @PathVariable("id") final UUID id
    ) {
        transferRepository.deleteById(id);
        eventPublisher.publishEvent(MoneyTransferred.builder()
                .username(username)
                .build()
        );
    }

}
