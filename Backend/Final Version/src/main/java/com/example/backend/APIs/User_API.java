package com.example.backend.APIs;

import com.example.backend.Models.Schedule;
import com.example.backend.Models.User;
import com.example.backend.controller.BackendControllers;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;


import java.sql.SQLException;

@CrossOrigin("*")
@SpringBootApplication
@RestController
public class User_API {

    BackendControllers controller = new BackendControllers();

    // totally new plan
    @PostMapping("/saveSchedule")
    @ResponseBody
    public Boolean saveSchedule(@RequestBody Schedule schedule) throws SQLException {
        return controller.saveSchedule(schedule);
    }

    //return existing plan
    @GetMapping("/getSchedule")
    @ResponseBody
    public Schedule getSchedule(@RequestParam Integer  id) throws SQLException {
        return controller.getSchedule(id);
    }

    //edit trip - add delete from front end and return back
    //delete all existing once from user ID and replace with new ones
    @PostMapping("/editSchedule")
    @ResponseBody
    public Boolean editSchedule(@RequestBody Schedule schedule) throws SQLException {
        return controller.editSchedule(schedule);
    }

    // totally delete a schedule according to user id
    @GetMapping("/deleteSchedule")
    @ResponseBody
    public Boolean deleteSchedule(@RequestParam String  id) throws SQLException {
        return controller.deleteSchedule(id);
    }

    //get the user object from the frontend that is to be deleted
    @PostMapping("/deleteUser")
    @ResponseBody
    public boolean deleteUser(@RequestBody User user) throws SQLException{
        return controller.deleteUser(user);
    }

    //get the user object from the frontend that is to be updated
    @PostMapping("/updateUser")
    @ResponseBody
    public User updateUser(@RequestBody User user) throws SQLException{
        return controller.updateUser(user);
    }

}
