using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
        [HttpGet("{userId}")]
        public async Task<ActionResult<LoginResponse>> LoginUser(string userId)
        {
            var result = await user.GetUserAsync(userId);

            if (result.Flag)
                return Ok(result.User);
            else return NotFound(result.Message);
        }
    }
}
