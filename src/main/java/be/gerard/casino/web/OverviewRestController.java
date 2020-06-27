package be.gerard.casino.web;

import be.gerard.casino.event.PlayerChanged;
import be.gerard.casino.model.OverviewEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("api/overview")
@RequiredArgsConstructor
public class OverviewRestController {

    private final DirectProcessor<OverviewEvent> processor = DirectProcessor.create();
    private final FluxSink<OverviewEvent> sink = processor.sink();
    private final AtomicInteger counter = new AtomicInteger();


    @GetMapping("events")
    public Flux<ServerSentEvent<OverviewEvent>> streamSseEmitter() {
        return processor.map(data -> ServerSentEvent.builder(data)
                .build()
        );
    }

    @GetMapping("test")
    public void test() {
        sink.next(OverviewEvent.builder()
                .test("test_" + counter.incrementAndGet())
                .build()
        );
    }


    @Async
    @EventListener
    public void handle(
            final PlayerChanged event
    ) {
        sink.next(OverviewEvent.builder()
                .test("test_" + counter.incrementAndGet())
                .build()
        );
    }

}
