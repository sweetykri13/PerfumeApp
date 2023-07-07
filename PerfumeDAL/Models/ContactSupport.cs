using System;
using System.Collections.Generic;

namespace PerfumeDAL.Models;

public partial class ContactSupport
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailId { get; set; }

    public string? Phone { get; set; }

    public string? ChoseAnOption { get; set; }

    public string? Description { get; set; }
}
