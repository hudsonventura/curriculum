using api;
using Microsoft.EntityFrameworkCore;

// Load .env file from the working directory into environment variables
DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();




var app = builder.Build();

// Apply pending migrations automatically at startup
using (var db = new DBContext())
{
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();




app.MapGet("/status", (HttpContext context, string? check) =>
{
    var ip = context.Request.Headers["X-Forwarded-For"].FirstOrDefault()
             ?? context.Connection.RemoteIpAddress?.ToString()
             ?? "unknown";

    Visit visit = new Visit()
    {
        Ip = ip,
        Check = check
    };

    using (DBContext dBContext = new DBContext())
    {
        dBContext.Visits.Add(visit);
        dBContext.SaveChanges();
    }
    return Results.Ok(visit);

});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
