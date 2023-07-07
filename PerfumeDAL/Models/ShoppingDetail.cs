using System;
using System.Collections.Generic;

namespace PerfumeDAL.Models;

public partial class ShoppingDetail
{
    public int Id { get; set; }

    public string? Image { get; set; }

    public string? ProductName { get; set; }

    public decimal? Price { get; set; }
}
