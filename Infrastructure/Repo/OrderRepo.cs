using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Contracts;
using Application.DTOs;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Repo;

internal class OrderRepo : IOrderService
{
    private readonly AppDbContext _context;
    private readonly ILogger<OrderRepo> _logger;
    private readonly Random _random;

    public OrderRepo(AppDbContext context, ILogger<OrderRepo> logger)
    {
        _context = context;
        _logger = logger;
        _random = new Random();
    }

    public async Task<List<ProductDTO>> GetProductsAsync()
    {
        var products = await _context.Products.ToListAsync();
        return products.Select(p => new ProductDTO
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            StockQuantity = p.StockQuantity
        }).ToList();
    }

    public async Task<OrderResponseDTO> CreateOrderAsync(string userId, CreateOrderDTO orderDto)
    {
        if (!int.TryParse(userId, out int userIdInt))
            throw new Exception("ID do usuário inválido");

        var order = new Order
        {
            UserId = userIdInt,
            Status = OrderStatus.Received,
            CreatedAt = DateTime.UtcNow,
            Items = new List<OrderItem>()
        };

        decimal totalAmount = 0;

        foreach (var item in orderDto.Items)
        {
            var product = await _context.Products.FindAsync(item.ProductId);
            if (product == null)
                throw new Exception($"Produto com ID {item.ProductId} não encontrado");

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                UnitPrice = product.Price,
                TotalPrice = product.Price * item.Quantity
            };

            order.Items.Add(orderItem);
            totalAmount += orderItem.TotalPrice;
        }

        order.TotalAmount = totalAmount;
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Simulação de processamento de pagamento
        await SimulatePaymentProcessingAsync(order);

        return await GetOrderByIdAsync(order.Id);
    }

    private async Task SimulatePaymentProcessingAsync(Order order)
    {
        // Delay aleatório de 2 a 5 segundos
        await Task.Delay(_random.Next(2000, 5000));

        // 80% de chance de sucesso
        bool paymentSuccess = _random.Next(100) < 80;

        order.Status = paymentSuccess ? OrderStatus.PaymentApproved : OrderStatus.PaymentRejected;
        order.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        if (paymentSuccess)
        {
            _logger.LogInformation($"Item reservado em estoque para o pedido {order.Id}");
            order.Status = OrderStatus.StockReserved;
        }
        else
        {
            _logger.LogInformation($"Cancelando reserva de estoque para o pedido {order.Id}");
            order.Status = OrderStatus.StockReservationCancelled;
        }

        await _context.SaveChangesAsync();
    }

    public async Task<OrderResponseDTO> GetOrderByIdAsync(int orderId)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
            return null;

        return new OrderResponseDTO
        {
            Id = order.Id,
            UserId = order.UserId.ToString(),
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CreatedAt = order.CreatedAt,
            Items = order.Items.Select(i => new OrderItemResponseDTO
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                TotalPrice = i.TotalPrice
            }).ToList()
        };
    }

    public async Task<List<OrderResponseDTO>> GetAllOrdersAsync()
    {
        var orders = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ToListAsync();

        return orders.Select(o => new OrderResponseDTO
        {
            Id = o.Id,
            UserId = o.UserId.ToString(),
            Status = o.Status,
            TotalAmount = o.TotalAmount,
            CreatedAt = o.CreatedAt,
            Items = o.Items.Select(i => new OrderItemResponseDTO
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                TotalPrice = i.TotalPrice
            }).ToList()
        }).ToList();
    }
} 