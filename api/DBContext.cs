using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api;

public class DBContext : DbContext
{
    private readonly string stringConnection;
    public DBContext() : base()
    {
        try
        {
            var host = Environment.GetEnvironmentVariable("POSTGRES_HOST");
            var db = Environment.GetEnvironmentVariable("POSTGRES_DB");
            var user = Environment.GetEnvironmentVariable("POSTGRES_USER");
            var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");

            stringConnection = $"Host={host};Database={db};Username={user};Password={password}";
        }
        catch (Exception)
        {
            Console.WriteLine("Error on Database configuration. See .env file.");
            throw;
        }

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(stringConnection);



    public DbSet<Visit> Visits { get; set; }
}
