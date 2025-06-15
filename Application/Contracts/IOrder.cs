using Application.DTOs;

namespace Application.Contracts
{
    public interface IOrderService
    {
        Task<List<ProductDTO>> GetProductsAsync();
        Task<OrderResponseDTO> CreateOrderAsync(string userId, CreateOrderDTO orderDto);
        Task<OrderResponseDTO> GetOrderByIdAsync(int orderId);
        Task<List<OrderResponseDTO>> GetAllOrdersAsync();
    }
}
