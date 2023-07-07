using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PerfumeDAL.Models;

public partial class PerfumeDbContext : DbContext
{
    public PerfumeDbContext()
    {
    }

    public PerfumeDbContext(DbContextOptions<PerfumeDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ChoseAnOption> ChoseAnOptions { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<ContactSupport> ContactSupports { get; set; }

    public virtual DbSet<ContactSupportV2> ContactSupportV2s { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Register> Registers { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<ShoppingDetail> ShoppingDetails { get; set; }

    public virtual DbSet<Subscribe> Subscribes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source =(localdb)\\MSSQLLocalDB;Initial Catalog=PerfumeDB;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChoseAnOption>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ChoseAnO__3214EC075DA9A999");

            entity.ToTable("ChoseAnOption");

            entity.Property(e => e.OptionValue)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contact__3214EC077A61F069");

            entity.ToTable("Contact");

            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Message).HasColumnType("text");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Subject)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ContactSupport>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ContactS__3214EC07A1F9C98F");

            entity.ToTable("ContactSupport");

            entity.Property(e => e.ChoseAnOption)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ContactSupportV2>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ContactS__3214EC07837BA6D0");

            entity.ToTable("ContactSupportV2");

            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Message).HasColumnType("text");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Subject)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Login__3214EC077BD3AC00");

            entity.ToTable("Login");

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Register>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Register__3214EC07012C27B4");

            entity.ToTable("Register");

            entity.Property(e => e.ConfirmPassword)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Review__3214EC07C7F8C52A");

            entity.ToTable("Review");

            entity.Property(e => e.ChooseYesOrNo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.MessageDes).HasColumnType("text");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ReviewMessage).HasColumnType("text");
        });

        modelBuilder.Entity<ShoppingDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Shopping__3214EC07E3E02FD1");

            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ProductName)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Subscribe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Subscrib__3214EC0778ABDAC0");

            entity.ToTable("Subscribe");

            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
