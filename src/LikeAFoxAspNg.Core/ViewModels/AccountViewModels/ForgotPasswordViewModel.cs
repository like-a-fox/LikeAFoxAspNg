using System.ComponentModel.DataAnnotations;

namespace LikeAFoxAspNg.Core.ViewModels.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
