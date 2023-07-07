using System;
using System.Collections.Generic;

namespace PerfumeDAL.Models;

public partial class Register
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailId { get; set; }

    public string? Phone { get; set; }

    public string? Password { get; set; }

    public string? ConfirmPassword { get; set; }
}
