using Moq;
using NUnit.Framework;
using PhoneBook.Controllers;
using PhoneBook.Models;
using PhoneBook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//This Test Class was made to show the use of mocking using Moq
namespace PhoneBookTests
{
    [TestFixture]
    class ContactControllerTests
    {
        IEnumerable<Contact> contacts = new List<Contact>(){
                new Contact("Test", "Test", "0123913201", "Test@gmail.com"),
                new Contact("Test2", "Test2", "0123913201", "Test@gmail.com")
            };
        Mock<IService> mockContactService;
        ContactsController contactsController;

        [Test]
        public void TestGetAll()
        {

            mockContactService = new Mock<IService>(MockBehavior.Strict);
            mockContactService.Setup(p => p.GetAll()).Returns(Task.FromResult(contacts));
            contactsController = new ContactsController(mockContactService.Object);
            var result = contactsController.GetContactList();

            Assert.AreEqual(result.Result, contacts);
            mockContactService.VerifyAll();
        }

        [Test]
        public void TestGet()
        {
            mockContactService = new Mock<IService>(MockBehavior.Strict);
            mockContactService.Setup(p => p.Get(Guid.Empty)).Returns(Task.FromResult(contacts.ToList()[0]));
            contactsController = new ContactsController(mockContactService.Object);
            var result = contactsController.GetContact(Guid.Empty);

            Assert.AreEqual(result.Result.ID, contacts.ToList()[0].ID);
            mockContactService.VerifyAll();
        }
    }
}
