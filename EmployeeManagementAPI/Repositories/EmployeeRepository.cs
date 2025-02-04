using Dapper;
using EmployeeManagementAPI.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
namespace EmployeeManagementAPI.Repositories
{

    public class EmployeeRepository
    {
        private readonly string _connectionString;

        public EmployeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("EmployeeDB");
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryAsync<Employee>("GetEmployees", commandType: CommandType.StoredProcedure);
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryFirstOrDefaultAsync<Employee>(
                "GetEmployeeById", new { EmployeeId = id }, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> AddEmployeeAsync(Employee employee)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.ExecuteAsync("AddEmployee", new
            {
                employee.FirstName,
                employee.LastName,
                employee.Email,
                employee.Position,
                employee.Department,
                employee.Salary,
                employee.DateOfJoining
            }, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> UpdateEmployeeAsync(Employee employee)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.ExecuteAsync("UpdateEmployee", new
            {
                employee.EmployeeId,
                employee.FirstName,
                employee.LastName,
                employee.Email,
                employee.Position,
                employee.Department,
                employee.Salary,
                employee.DateOfJoining
            }, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> DeleteEmployeeAsync(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.ExecuteAsync("DeleteEmployee", new { EmployeeId = id }, commandType: CommandType.StoredProcedure);
        }
    }

}
