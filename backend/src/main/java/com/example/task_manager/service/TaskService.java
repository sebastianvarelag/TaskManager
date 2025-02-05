package com.example.task_manager.service;

import com.example.task_manager.model.Task;
import com.example.task_manager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
  private final TaskRepository taskRepository;

  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  public List<Task> findAll() {
    return taskRepository.findAll();
  }

  public Task findById(Integer id) {
    return taskRepository.findById(id).orElse(null);
  }

  public Task save(Task task) {
    return taskRepository.save(task);
  }

  public void deleteById(Integer id) {
    taskRepository.deleteById(id);
  }

  public List<Task> searchByTitle(String title) {
    return taskRepository.findByTitleContainingIgnoreCase(title);
  }

  public List<Task> findByCompleted(boolean completed) {
    return taskRepository.findByCompleted(completed);
  }

  public List<Task> searchByTitleAndStatus(String title, boolean completed) {
    return taskRepository.findByTitleContainingIgnoreCaseAndCompleted(title, completed);
  }
}