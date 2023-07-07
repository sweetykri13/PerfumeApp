using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PerfumeDAL;
using PerfumeDAL.Models;
using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.SwaggerUI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics;

namespace PerfumeAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PerfumeController : Controller
    {
        PerfumeRepository repo=new PerfumeRepository();

        [HttpGet]
        public ActionResult<List<ShoppingDetail>> GetShoppingDetail()
        {
            List<ShoppingDetail> shop = new List<ShoppingDetail>();
            try
            {
                shop = repo.GetShoppingDetails();
            }
            catch (Exception)
            {
                shop = null;
            }
            return shop;
        }
        [HttpGet]
        public JsonResult GetUserDetails(string email, string password)
        {
            Register user = null;
            try
            {
                user = repo.GetUserDetails(email, password);
            }
            catch (Exception)
            {
                user = null;
            }
            return Json(user);
        }

        [HttpPost]
        public JsonResult AddContact(string name, string emailId, string phone, string address, string subject, string message)
        {
            bool status = false;

            string messages;
            try
            {
                status = repo.AddContactDetails(name, emailId, phone, address, subject, message);
                if (status)
                {
                    messages = "Successful addition operation";
                }
                else
                {
                    messages = "Unsuccessful addition operation!";
                }
            }
            catch (Exception)
            {
                message = "Some error occured, please try again!";
            }
            return Json(message);
        }
        [HttpPost]
        public JsonResult AddContactSupport(string firstname, string lastname, string emailId, string phone, string option, string description)
        {
            bool status = false;

            string messages;
            try
            {
                status = repo.AddContactSupport(firstname, lastname, emailId, phone, option, description);
                if (status)
                {
                    messages = "Successful addition operation";
                }
                else
                {
                    messages = "Unsuccessful addition operation!";
                }
            }
            catch (Exception)
            {
                messages = "Some error occured, please try again!";
            }
            return Json(messages);
        }
        [HttpPost]
        public JsonResult AddReview(string firstname, string lastname, string emailId, string phone, string reviewmessage, string yesOrno, int rating)
        {
            bool status = false;

            string messages;
            try
            {
                status = repo.AddReview(firstname, lastname, emailId, phone, reviewmessage, yesOrno, rating);
                if (status)
                {
                    messages = "Successful addition operation";
                }
                else
                {
                    messages = "Unsuccessful addition operation!";
                }
            }
            catch (Exception)
            {
                messages = "Some error occured, please try again!";
            }
            return Json(messages);
        }
        [HttpPost]
        public JsonResult AddSubscribe(string emailId)
        {
            bool status = false;

            string messages;
            try
            {
                status = repo.AddSubscribe(emailId);
                if (status)
                {
                    messages = "Successful addition operation";
                }
                else
                {
                    messages = "Unsuccessful addition operation!";
                }
            }
            catch (Exception)
            {
                messages = "Some error occured, please try again!";
            }
            return Json(messages);
        }
        [HttpPost]
        public JsonResult AddUser(string firstname, string lastname, string emailId, string phone, string password, string confirmPassword)
        {
            bool status = false;

            string messages;
            try
            {
                status = repo.AddUser(firstname, lastname, emailId, phone, password, confirmPassword);
                if (status)
                {
                    messages = "Successful addition operation";
                }
                else
                {
                    messages = "Unsuccessful addition operation!";
                }
            }
            catch (Exception)
            {
                messages = "Some error occured, please try again!";
            }
            return Json(messages);
        }
        [HttpGet]
        public ActionResult<List<ChoseAnOption>> GetChoseAnOption()
        {
            List<ChoseAnOption> options = new List<ChoseAnOption>();
            try
            {
                options = repo.GetChoseAnOptionList();
            }
            catch (Exception)
            {

                options = null;
            }
            return Json(options);
        }
    }
}
