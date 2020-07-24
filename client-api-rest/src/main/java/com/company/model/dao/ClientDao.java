package com.company.model.dao;

import com.company.model.entity.Client;
import org.springframework.data.repository.CrudRepository;

public interface ClientDao extends CrudRepository<Client, Long> {
}
