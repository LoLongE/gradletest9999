package com.dev.ledger.web;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

//import com.dev.ledger.dao.LedgerDAO;
//import com.dev.ledger.domain.LedgerVO;

public class OracleConnectionTest {

	/*
	private static final String DRIVER = "oracle.jdbc.driver.OracleDriver";
	private static final String URL = "jdbc:oracle:thin:@192.168.16.50:31521:xe";
	private static final String USER = "lolong";
	private static final String PASSWORD = "lolong";
	*/ 
	/*	
	private static final String DRIVER = "oracle.jdbc.driver.OracleDriver";
	private static final String URL = "jdbc:oracle:thin:@192.168.16.50:1521:orcl";
	private static final String USER = "lolong";
	private static final String PASSWORD = "lolong"; 
	*/		
	/*
	private static final String DRIVER = "com.mysql.jdbc.Driver";
	private static final String URL = "jdbc:mysql://localhost:33306/insaview";
	private static final String USER = "root";
	private static final String PASSWORD = "lolong"; 
	@Autowired
	LedgerDAO ledgerDAO;
	
	LedgerVO ledgerVO;
	
	@Test
	public void testConnection() throws Exception {
		Class.forName(DRIVER);
		try {
			Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
			System.out.println("connection Success: " + connection);
		} catch (Exception e) {
			System.out.println("connection Fail : " + e);			
		}
	}
	
	@Test
	public void select() throws Exception {
		//List<BoardVO2> result = ledgerDAO.selectLedgerForm2();
		//System.err.println(result);
	}
	
	@Test
	public void sqlTest() throws Exception {
	        Connection con = null;
	        PreparedStatement pstmt = null;   
	        ResultSet rs = null;
	        try {
	            Class.forName("com.mysql.jdbc.Driver");
	            
	            con = DriverManager.getConnection(
	                "jdbc:mysql://localhost:33306/insaview",
	                "root",
	                "lolong");
	                        
	            pstmt = con.prepareStatement("select * from v_usermaster");
	            System.out.println(pstmt);
	            rs = pstmt.executeQuery();
	            System.out.println(rs);
	            while(rs.next()) {
	                //.
	            }
	        } catch(Exception e) {
	            e.printStackTrace();
	        } finally {
	            try {
	                if(rs != null) {
	                    rs.close(); // 선택 사항
	                }
	                
	                if(pstmt != null) {
	                    pstmt.close(); // 선택사항이지만 호출 추천
	                }
	            
	                if(con != null) {
	                    con.close(); // 필수 사항
	                }
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	
	/*
	@Test    
    public void selectLoginView() throws Exception {
		System.out.println("1 : " + memberVO);
		String a = "kyle";
	try {
		System.out.println("try");
		memberDAO.selectLoginView_TEST();
	} catch (Exception e) {
		e.printStackTrace();
		// TODO: handle exception
	}
		
    }
	*/
}


