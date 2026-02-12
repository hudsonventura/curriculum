using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api;

/// <summary>
/// Visit entity
/// </summary>
[Table("visit")]
public class Visit
{
    [Column("id")]
    public Guid Id { get; set; } = SnowflakeGuid.NewGuid();

    [Column("datetime")]
    public DateTime Datetime { get; } = DateTime.UtcNow;

    [Column("ip")]
    public string? Ip { get; set; }

    [Column("check")]
    public string? Check { get; set; }
}
