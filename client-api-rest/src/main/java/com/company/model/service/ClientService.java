package com.company.model.service;

import com.company.model.entity.Client;

import java.util.List;

public interface ClientService {

    List<Client> findAll();

    Client findById(Long id);

    Client create(Client client);

    void delete(Long id);

}
