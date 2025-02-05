package com.example.task_manager.controller;

import com.example.task_manager.model.Task;
import com.example.task_manager.service.TaskService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks(@RequestParam(required = false) String title,
                                 @RequestParam(required = false) Boolean completed) {
        if (title != null && completed != null) {
            return taskService.searchByTitleAndStatus(title, completed);
        } else if (title != null) {
            return taskService.searchByTitle(title);
        } else if (completed != null) {
            return taskService.findByCompleted(completed);
        }
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Integer id) {
        return taskService.findById(id);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task task) {
        task.setId(id);
        return taskService.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteById(id);
    }

    @PatchMapping("/{id}/toggle")
    public Task toggleTaskComplete(@PathVariable Integer id) {
        return taskService.toggleComplete(id);
    }
}