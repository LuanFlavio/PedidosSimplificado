using Application.Contracts;
using Application.DTOs;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repo
{
    internal class UserRepo : IUser
    {
        private readonly AppDbContext _dbContext;
        public UserRepo(AppDbContext dbContext) {
            this._dbContext = dbContext;
        }

        public async Task<LoginResponse> LoginUserAsync(LoginDTO loginDTO)
        {
            var getUser = await this.FindUserByEmail(loginDTO.Email!);
            if (getUser == null) return new LoginResponse(false, "Credenciais incorretas");

            bool checkPass = BCrypt.Net.BCrypt.Verify(loginDTO.Password, getUser.Password);
            if (checkPass)
                return new LoginResponse(true, "Login feito com sucesso", GenerateJWTToken(getUser));
            else
                return new LoginResponse(false, "Credenciais incorretas");
        }

        private async Task<ApplicationUser> FindUserByEmail(string email) =>
            await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            public async Task<RegistrationResponse> RegistrationUserAsync(RegisterUserDTO registerUserDTO)
        {
            var getUser = await this.FindUserByEmail(registerUserDTO.Email!);
            if (getUser != null)
                return new RegistrationResponse(false, "Usuário já existe");

            _dbContext.Users.Add(new ApplicationUser()
            {
                Name = registerUserDTO.Name,
                Email = registerUserDTO.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerUserDTO.Password),
            });
            await _dbContext.SaveChangesAsync();

            return new RegistrationResponse(true, "Usuário registrado com sucesso");
        }
    }
}
