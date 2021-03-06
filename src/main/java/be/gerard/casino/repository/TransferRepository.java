package be.gerard.casino.repository;

import be.gerard.casino.model.Transfer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, UUID> {

    List<Transfer> findAllByUsername(
            String username
    );

    List<Transfer> findAllByUsernameOrderByTimestampDesc(
            String username
    );

    Slice<Transfer> findAllByUsernameOrderByTimestampDesc(
            String username,
            Pageable pageable
    );

}
