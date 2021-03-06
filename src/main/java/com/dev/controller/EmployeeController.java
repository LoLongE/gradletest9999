package com.dev.controller;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dev.entity.Employee;
import com.dev.entity.GameData;
import com.dev.repository.EmployeeRepository;

@Controller
public class EmployeeController {

	@Autowired
	public EmployeeRepository employeeRepository;
	
	//@PostMapping("/employee")
	
	//@RequestBody Employee employee
	@RequestMapping("/employee")
	public Employee saveEmployee(){
		System.out.println("saveEmployee");
		//return employeeRepository.save(employee);
		return null;
	}
	
	@RequestMapping("/gemployee/{id}")
	public Employee getEmployee(@PathVariable("id") String employeeId){
		System.out.println("abc");
		System.out.println(employeeId);
		System.out.println(employeeRepository.getEmployeeById(employeeId));
		
		return employeeRepository.getEmployeeById(employeeId);
	}
	/*
	@RequestMapping("/allEmployee")
	public List<Employee> allEmployee(){
		System.out.println("abc");
		//System.out.println(employeeRepository.getEmployee());
		List<Employee> emp = employeeRepository.allEmployee();
		return emp;
	}
	
	*/
	@RequestMapping("/aallEmployee")
	public List<GameData> allEmployee(){
		System.out.println("ccc");
		//System.out.println(employeeRepository.getEmployee());
		List<GameData> emp = employeeRepository.allEmployee();
		return emp;
	}
	
	@RequestMapping("/allEmployee")
	public String allEmployee(Model model){
		System.out.println("abc");
		//System.out.println(employeeRepository.getEmployee());
		//List<GameData> result = employeeRepository.allEmployee();
		//System.out.println(result);
		//System.out.println(result.get(0));
		//System.out.println(result.size());
		//List<GameData> result = new List<GameData>();
			
		//model.addAttribute("result", result);
		return "ledger/main";
	}
	@RequestMapping(value = "/a5.do")
	public String a5(Model model) {
		//logger.info( "[LedgerController] : selectMainLedgerForm ledger/Main Load " );		
		return "board/boardList";
	}
	
	@RequestMapping(value = "/a4.do")
	public String a4(Model model) {
		//logger.info( "[LedgerController] : selectMainLedgerForm ledger/Main Load " );		
		return "blog/blogList";
	}
	
	@RequestMapping(value = "/a3.do")
	public String a3(Model model) {
		//logger.info( "[LedgerController] : selectMainLedgerForm ledger/Main Load " );		
		return "report/report.jsp";
	}
	
	@DeleteMapping("/demployee/{id}")
	public String deleteEmployee(@PathVariable("id") String employeeId){
		return employeeRepository.delete(employeeId);
	}
	
	@PutMapping("/pemployee/{id}")
	public String updateEmployee(@PathVariable("id") String employeeId, @RequestBody Employee employee){
		return employeeRepository.update(employeeId, employee);
	}
	
	
}
