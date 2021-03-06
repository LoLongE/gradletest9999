package com.dev.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.dev.entity.Employee;
import com.dev.entity.GameData;

@Repository
public class EmployeeRepository {


	@Autowired
	private DynamoDBMapper dynamoDBMapper;
	
	public Employee save(Employee employee){
		dynamoDBMapper.save(employee);
		return employee;
	}
	
	public Employee getEmployeeById(String employeeId) {
		return dynamoDBMapper.load(Employee.class, employeeId);
	}
	public List<GameData> allEmployee() {
		Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        //eav.put(":val1", new AttributeValue().withN(value));
        eav.put(":val1", new AttributeValue().withS("y"));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
            .withFilterExpression("yn = :val1").withExpressionAttributeValues(eav);
		return dynamoDBMapper.scan(GameData.class, scanExpression);
	}
	
	public String delete(String employeeId){
		Employee emp = dynamoDBMapper.load(Employee.class, employeeId);
		dynamoDBMapper.delete(emp);
		return "Employee Deleted!";
		
	}
	
	public String update(String employeeId, Employee employee) {
		dynamoDBMapper.save(employee, new DynamoDBSaveExpression()
				.withExpectedEntry("employeeId", 
						new ExpectedAttributeValue(
								new AttributeValue().withS(employeeId)
						)));
		return employeeId;
	}
}
