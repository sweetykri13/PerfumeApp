using PerfumeDAL.Models;

namespace PerfumeDAL
{
    public class PerfumeRepository
    {
        public PerfumeDbContext context { get; set; }
        public PerfumeRepository()
        {
            context = new PerfumeDbContext();
        }

        public List<ShoppingDetail> GetShoppingDetails()
        {
            List<ShoppingDetail> shoppingDetails = new List<ShoppingDetail>();
            try
            {
                shoppingDetails = (from shop in context.ShoppingDetails select shop).ToList();
            }
            catch (Exception e)
            {
                shoppingDetails = null;


            }
            return shoppingDetails;
        }

        public bool AddContactDetails(string name, string emailId, string phone, string address, string subject, string message)
        {
            bool status = false;
            try
            {
                Contact contact = new Contact();
                contact.Name = name;
                contact.EmailId = emailId;
                contact.Phone = phone;
                contact.Address = address;
                contact.Subject = subject;
                contact.Message = message;
                context.Contacts.Add(contact);
                context.SaveChanges();
                status = true;

            }
            catch (Exception e)
            {
                status = false;

            }
            return status;
        }

        public bool AddReview(string firstname, string lastname, string emailId, string phone, string reviewmessage, string yesOrno, int rating)
        {
            bool status = false;
            try
            {
                Review review = new Review();
                review.FirstName = firstname;
                review.LastName = lastname;
                review.EmailId = emailId;
                review.Phone = phone;
                review.ReviewMessage = reviewmessage;
                review.MessageDes = yesOrno;
                review.Rating = rating;
                context.Reviews.Add(review);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }

        public bool AddContactSupport(string firstname, string lastname, string emailId, string phone, string option, string description)
        {
            bool status = false;
            try
            {
                ContactSupport contactSupport = new ContactSupport();
                contactSupport.FirstName = firstname;
                contactSupport.LastName = lastname;
                contactSupport.EmailId = emailId;
                contactSupport.Phone = phone;
                contactSupport.ChoseAnOption = option;
                contactSupport.Description = description;
                context.ContactSupports.Add(contactSupport);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }


        public bool AddSubscribe(string emailId)
        {
            bool status = false;
            try
            {
                Subscribe subscribe = new Subscribe();
                subscribe.EmailId = emailId;
                context.Subscribes.Add(subscribe);
                context.SaveChanges();
                status = true;

            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }

        public bool AddUser(string firstname, string lastname, string emailId, string phone, string password, string confirmPassword)
        {
            bool status = false;
            try
            {
                Register register = new Register();
                register.FirstName = firstname;
                register.LastName = lastname;
                register.EmailId = emailId;
                register.Phone = phone;
                register.Password = password;
                register.ConfirmPassword = confirmPassword;
                context.Add(register);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }

        public Register GetUserDetails(string emailId, string password)
        {
            try
            {
                Register user = context.Registers.FirstOrDefault(u => u.EmailId == emailId && u.Password == password);
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<ChoseAnOption> GetChoseAnOptionList()
        {
            List<ChoseAnOption> options = new List<ChoseAnOption>();
            try
            {
                options = (from opt in context.ChoseAnOptions select opt).ToList();
            }
            catch (Exception e)
            {

                options = null;
            }
            return options;
        }
    }
}
