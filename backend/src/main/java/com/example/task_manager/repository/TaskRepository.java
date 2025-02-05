package com.example.task_manager.repository;

import com.example.task_manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByTitleContainingIgnoreCase(String title);
    
    List<Task> findByCompleted(boolean completed);

    List<Task> findByTitleContainingIgnoreCaseAndCompleted(String title, boolean completed);
}