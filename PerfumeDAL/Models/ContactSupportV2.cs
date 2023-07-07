using System;
using System.Collections.Generic;

namespace PerfumeDAL.Models;

public partial class ContactSupportV2
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? EmailId { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }
}
