using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using PhoneBook.Models;
using PhoneBook.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PhoneBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        IService ContactService;
        public ContactsController(IService contactService)
        {
            this.ContactService = contactService;
        }
        // GET: api/<ContactsController>
        [HttpGet("AllContacts")]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(List<Contact>))]
        public async Task<IEnumerable<Contact>> GetContactList()
        {
            return await ContactService.GetAll();
        }

        // GET api/<ContactsController>/5
        [HttpGet("{id}")]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(Contact))]
        public async Task<Contact> GetContact(Guid id)
        {
            return await ContactService.Get(id);
        }

        // POST api/<ContactsController>
        [HttpPost]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(Contact))]
        public async Task<Contact> CreateContact([FromBody] Contact contact)
        {
            var con = await this.ContactService.Insert(contact);
            await ContactService.SaveChanges();

            return con;
        }

        // PUT api/<ContactsController>/5
        [HttpPut]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(Contact))]
        public async Task<Contact> UpdateContact([FromBody] Contact contact)
        {
            var con = await this.ContactService.Update(contact);
            await ContactService.SaveChanges();

            return con;
        }

        // DELETE api/<ContactsController>/5
        [HttpDelete("delete/{id}")]
        [SwaggerResponse((int)HttpStatusCode.OK)]
        public async Task DeleteContact(Guid id)
        {
            await ContactService.Delete(id);
            await ContactService.SaveChanges();
        }
    }
}
