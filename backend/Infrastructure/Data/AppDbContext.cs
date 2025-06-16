using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    internal class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany()
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.Items)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany()
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed de produtos
            var seedDate = new DateTime(2025, 6, 15, 0, 0, 0, DateTimeKind.Utc);
            builder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Smartphone XYZ",
                    Description = "Smartphone último modelo",
                    Price = 1999.99m,
                    StockQuantity = 50,
                    CreatedAt = seedDate
                },
                new Product
                {
                    Id = 2,
                    Name = "Notebook ABC",
                    Description = "Notebook para trabalho",
                    Price = 3999.99m,
                    StockQuantity = 30,
                    CreatedAt = seedDate
                },
                new Product
                {
                    Id = 3,
                    Name = "Fone de Ouvido Pro",
                    Description = "Fone de ouvido sem fio",
                    Price = 299.99m,
                    StockQuantity = 100,
                    CreatedAt = seedDate
                }
            );
        }
    }
}
