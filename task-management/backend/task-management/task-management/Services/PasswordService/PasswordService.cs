using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using task_management.Models;

namespace task_management.Services.PasswordService
{
    public class PasswordService : IPasswordInterface
    {
        private readonly IConfiguration _configuration;
        public PasswordService(IConfiguration config)
        {
            _configuration = config;
         
            
        }
        public void createHashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                Console.WriteLine($"Generated salt length: {passwordSalt.Length} bytes");
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));  
            }
        }

        public string generateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>() { 
               new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
               new Claim("Email", user.Email),
               new Claim("Username", user.Name)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);


            var token = new JwtSecurityToken(
                issuer: _configuration["AppSettings:Issuer"],
                audience: _configuration["AppSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(4),
                signingCredentials: cred
                );
        
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        
        }



        public bool isPasswordValid(string password, byte[] passwordHash, byte[] passwordSalt)

        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }

        }
    }

}
