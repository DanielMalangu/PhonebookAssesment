using NUnit.Framework;
using PhoneBook.Models;
using System.Collections.Generic;
using PhoneBook.Services;
using Moq;
using System;
using System.Threading.Tasks;
using PhoneBook.Controllers;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Data;

namespace PhoneBookTests
{
    [TestFixture]
    public class ContactServiceTests
    {
        List<Contact> contacts = new List<Contact>(){
                new Contact("Test", "Test", "0123913201", "Test@gmail.com"),
                new Contact("Test2", "Test2", "0123913201", "Test@gmail.com")
        };

        IService contactService;
        PhoneBookDBContext context;

        [OneTimeSetUp]
        public void Init()
        {

        }
        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<PhoneBookDBContext>().UseInMemoryDatabase(databaseName: "PhoneBookDatabase")
            .Options;
            context = new PhoneBookDBContext(options);
            // Insert seed data into the database using one instance of the context
            foreach (Contact contact in contacts)
            {
                var result = context.Contacts.Add(contact);
                contact.ID = result.Entity.ID;
            }
            context.SaveChanges();

            contactService = new ContactService(context);
        }


        [Test]
        public async Task TestGetAll()
        {

            var result = await contactService.GetAll();
            Assert.AreEqual(result.ToList().Count, contacts.Count);
        }

        //Just made to show use of mock objects
        [Test]
        public async Task TestGet()
        {
            var result = await contactService.Get(contacts[1].ID);

            Assert.AreEqual(result.ID, contacts.ToList()[1].ID);
        }

        [Test]
        public async Task TestInsert()
        {
            var c = new Contact("Me", "You", "your.cousin@ym.com", "0091238-123");
            var result = await contactService.Insert(c);
            await contactService.SaveChanges();

            Assert.AreEqual(result.Name, c.Name);
            Assert.AreEqual(result.Surname, c.Surname);
            Assert.AreEqual(result.Email, c.Email);
            Assert.AreEqual(result.Number, c.Number);
        }

        [Test]
        public async Task TestUpdate()
        {
            contacts[1].Name = "Updated";
            var result = await contactService.Update(contacts[1]);
            await contactService.SaveChanges();

            Assert.AreEqual(result.ID, contacts.ToList()[1].ID);
            Assert.AreEqual(result.Name, contacts.ToList()[1].Name);
            Assert.AreEqual(result.Surname, contacts.ToList()[1].Surname);
            Assert.AreEqual(result.Email, contacts.ToList()[1].Email);
            Assert.AreEqual(result.Number, contacts.ToList()[1].Number);
        }

        [Test]
        public async Task TestDelete()
        {
            Assert.AreEqual(context.Contacts.ToList().Count, contacts.Count);
            var result = await contactService.Delete(contacts[0].ID);
            await contactService.SaveChanges();

            Assert.AreEqual(result.ID, contacts[0].ID);
            Assert.AreNotEqual(context.Contacts.ToList().Count, contacts.Count);
        }

        [TearDown]
        public void Cleanup()
        {
            var deleted = context.Database.EnsureDeleted();
        }
    }
}