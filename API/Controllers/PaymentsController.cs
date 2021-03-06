using System.IO;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
  public class PaymentsController : BaseApiController
  {
    private readonly IPaymentService _paymentService;
    private const string WhSecret = "whsec_e8CE4iKTqLdgX373KUuB1b7SgSU4LzOr";
    public PaymentsController(IPaymentService paymentService)
    {
      _paymentService = paymentService;
    }

    [Authorize]
    [HttpPost("{basketId}")]
    public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
    {
        var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

        if (basket == null) return BadRequest(new ApiResponse(400, "Problem with your basket"));

        return basket;
    }

    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook() 
    {
      var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

      var stripeEvent = EventUtility.ConstructEvent(json, HttpContext.Request.Headers["Stripe-Signature"], WhSecret);

      PaymentIntent intent;
      Core.Entities.OrderAggregate.Order order;

      switch (stripeEvent.Type)
      {
        case "payment_intent.succeeded":
          intent = (PaymentIntent)stripeEvent.Data.Object;
          order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);
          break;
        case "payment_intent.payment_failed":
          intent = (PaymentIntent)stripeEvent.Data.Object;
          order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
          break;
      }

      return new EmptyResult();
    }
  }
}