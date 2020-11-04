package com.company.controller;

import com.company.model.entity.Client;
import com.company.model.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClientRestController {

    private final ClientService clientService;

    @Autowired
    public ClientRestController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/clients")
    public List<Client> index() {
        return clientService.findAll();
    }

    @GetMapping("/clients/{id}")
    public Client show(@PathVariable Long id) {
        return clientService.findById(id);
    }

    @PostMapping("/clients")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Client create(@RequestBody Client client) {
        return clientService.create(client);
    }

    @PutMapping("/clients/{id}")
    public Client update(@PathVariable Long id, @RequestBody Client client) {

        Client current = clientService.findById(id);

        if (current == null) {
            return null;
        }

        current.setFirstName(client.getFirstName());
        current.setLastName(client.getLastName());
        current.setEmail(client.getEmail());
        return clientService.create(current);
    }

    @DeleteMapping("/clients/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        clientService.delete(id);
    }

}
