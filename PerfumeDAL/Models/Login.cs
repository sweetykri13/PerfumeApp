using System;
using System.Collections.Generic;

namespace PerfumeDAL.Models;

public partial class Login
{
    public int Id { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }
}
