using System;
using System.Collections.Generic;

namespace PerfumeDAL.Models;

public partial class Review
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailId { get; set; }

    public string? Phone { get; set; }

    public string? ReviewMessage { get; set; }

    public string? ChooseYesOrNo { get; set; }

    public string? MessageDes { get; set; }

    public int? Rating { get; set; }
}
