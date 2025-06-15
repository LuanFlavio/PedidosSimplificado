using Application.Contracts;
using Application.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser user;

        public UserController(IUser user)
        {
            this.user = user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> LoginUser(LoginDTO loginDTO)
        {
            var result = await user.LoginUserAsync(loginDTO);

            if (result.Flag)
                return Ok(result);
            else return BadRequest(result);
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<RegistrationResponse>> RegisterUser(RegisterUserDTO registerDTO)
        {
            var result = await user.RegistrationUserAsync(registerDTO);

            if(result.Flag)
                return Ok(result);
            else return BadRequest(result);

        }
    }
}
