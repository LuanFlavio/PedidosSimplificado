using Domain.Entities;

namespace Application.DTOs
{
    public record GetUserResponse(bool Flag, string Message = null!, ApplicationUser User = null!);
}
