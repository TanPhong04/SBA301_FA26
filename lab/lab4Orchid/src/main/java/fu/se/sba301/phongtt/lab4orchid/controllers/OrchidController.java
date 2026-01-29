    package fu.se.sba301.phongtt.lab4orchid.controllers;

    import fu.se.sba301.phongtt.lab4orchid.pojos.Orchid;
    import fu.se.sba301.phongtt.lab4orchid.services.IOrchidService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;
    import java.util.Optional;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;


    @RestController
    @CrossOrigin
    @RequestMapping("/orchids")
    public class OrchidController {
        @Autowired
        private IOrchidService iOrchidService;


        @GetMapping
        public ResponseEntity<List<Orchid>> fetchAll() {
            return ResponseEntity.ok(iOrchidService.getAllOrchids());
        }


        @GetMapping("/{id}")
        public ResponseEntity<Orchid> getOById(@PathVariable int id) {
            return ResponseEntity.ok(iOrchidService.getOrchidByID(id));
        }


        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public Orchid saveOrchid(@RequestBody Orchid orchid) {
            return iOrchidService.insertOrchid(orchid);
        }


        @PutMapping("/{id}")
        public ResponseEntity<Orchid> updateOrchid(@PathVariable int id, @RequestBody Orchid o) {
            Orchid updated = iOrchidService.updateOrchid(id, o);
            return ResponseEntity.ok(updated);
        }


        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
            iOrchidService.deleteOrchid(id);
            return ResponseEntity.ok("Deleted!!");
        }
    }