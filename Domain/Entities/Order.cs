using System;
using System.Collections.Generic;

namespace Domain.Entities;

public enum OrderStatus
{
    Received,
    AwaitingPayment,
    PaymentApproved,
    PaymentRejected,
    StockReserved,
    StockReservationCancelled
}

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public ApplicationUser User { get; set; }
    public OrderStatus Status { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public ICollection<OrderItem> Items { get; set; }
} 