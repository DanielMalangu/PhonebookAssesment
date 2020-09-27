using PhoneBook.Data;
using PhoneBook.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneBook.Services
{
    public class ContactService : IService
    {
        private readonly PhoneBookDBContext _context;
        public ContactService(PhoneBookDBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Contact>> GetAll()
        {
            return await _context.Set<Contact>().ToListAsync();
        }
            
        public async Task<Contact> Get(Guid id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<Contact> Insert(Contact contact)
        {
            var tempContact = await this.Get(contact.ID);
            if (tempContact == null)
                await _context.Contacts.AddAsync(contact);
            else
                throw new Exception("Contact already exists");
            return contact;
        }
        public async Task<Contact> Update(Contact contact)
        {
            var tempContact = await this.Get(contact.ID);
            if (tempContact != null)
            {
                tempContact.Name = contact.Name;
                tempContact.Surname = contact.Surname;
                tempContact.Number = contact.Number;
                tempContact.Email = contact.Email;
                _context.Contacts.Update(tempContact);
            }
            else
                throw new Exception("Contact not found");

            return contact;
        }
        public async Task<Contact> Delete(Guid id)
        {
            Contact contact = await this.Get(id);
            _context.Contacts.Remove(contact);
            return contact;
        }
        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }

    }
}
