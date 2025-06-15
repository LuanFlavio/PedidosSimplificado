using Application.DTOs;

namespace Application.Contracts
{
    public interface IUser
    {
        Task<RegistrationResponse> RegistrationUserAsync(RegisterUserDTO registerUserDTO);
        Task<LoginResponse> LoginUserAsync(LoginDTO loginDTO);
    }
}
