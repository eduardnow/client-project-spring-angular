package com.company.controller;

import com.company.model.entity.Client;
import com.company.model.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/clients")
public class ClientRestController {

    private final ClientService clientService;

    @Autowired
    public ClientRestController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/")
    public List<Client> index() {
        return clientService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> show(@PathVariable Long id) {
        Client client = clientService.findById(id);

        if (client == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    @PostMapping("/")
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<Client> create(@RequestBody Client client) {
        Client clientNew = clientService.create(client);

        return new ResponseEntity<>(clientNew, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client client) {
        Client current = clientService.findById(id);

        if (client == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        current.setFirstName(client.getFirstName());
        current.setLastName(client.getLastName());
        current.setEmail(client.getEmail());
        Client clientUpdated = clientService.create(current);

        return new ResponseEntity<>(clientUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        clientService.delete(id);
    }

}
