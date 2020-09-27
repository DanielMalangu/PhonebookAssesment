using NUnit.Framework;
using PhoneBook.Models;
using System.Collections.Generic;
using PhoneBook.Services;
using Moq;
using System;
using System.Threading.Tasks;
using System.Net.Http;
using PhoneBook.Controllers;
using System.Collections.Immutable;
using PhoneBook.Controllers;
using PhoneBook.Services;
using System.Linq;

namespace PhoneBookTests
{
    public class Tests
    {
        IEnumerable<Contact> contacts = new List<Contact>(){
                new Contact("Test", "Test", "0123913201", "Test@gmail.com"),
                new Contact("Test2", "Test2", "0123913201", "Test@gmail.com")
            };
        Mock<IService> mockContactService;
        ContactsController contactsController;

        [SetUp]
        public void Setup()
        {
        }

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

        [Test]
        public void TestInsert()
        {
            mockContactService = new Mock<IService>(MockBehavior.Strict);    
            mockContactService.Setup(p => p.Insert(contacts.ToList()[0])).Returns(Task.FromResult(contacts.ToList()[0]));
            contactsController = new ContactsController(mockContactService.Object);
            var result = contactsController.CreateContact(contacts.ToList()[0]);

            Assert.AreEqual(result.Result.Name, contacts.ToList()[0].Name);
            Assert.AreEqual(result.Result.Surname, contacts.ToList()[0].Surname);
            Assert.AreEqual(result.Result.Email, contacts.ToList()[0].Email);
            Assert.AreEqual(result.Result.Number, contacts.ToList()[0].Number);
            mockContactService.VerifyAll();
        }

        [Test]
        public void TestUpdate()
        {
            mockContactService = new Mock<IService>(MockBehavior.Strict);
            mockContactService.Setup(p => p.Update(contacts.ToList()[0])).Returns(Task.FromResult(contacts.ToList()[1]));
            contactsController = new ContactsController(mockContactService.Object);
            var result = contactsController.UpdateContact(contacts.ToList()[0]);

            Assert.AreEqual(result.Result.ID, contacts.ToList()[1].ID);
            mockContactService.VerifyAll();
        }
        [Test]
        public void TestDelete()
        {
            mockContactService = new Mock<IService>(MockBehavior.Strict);
            mockContactService.Setup(p => p.Delete(contacts.ToList()[1].ID)).Returns(Task.FromResult(contacts.ToList()[1]));
            contactsController = new ContactsController(mockContactService.Object);
            var result = contactsController.GetContact(Guid.Empty);

            Assert.AreEqual(result.Result.ID, contacts.ToList()[1].ID);
            mockContactService.VerifyAll();
        }
    }
}