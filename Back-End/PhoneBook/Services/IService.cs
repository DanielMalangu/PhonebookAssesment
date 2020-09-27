using PhoneBook.Models;
using PhoneBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneBook.Services
{
    public interface IService
    {
        public Task<IEnumerable<Contact>> GetAll();
        public Task<Contact> Get(Guid id);
        public Task<Contact> Insert(Contact contact);
        public Task<Contact> Update(Contact contact);
        public Task<Contact> Delete(Guid id);        
        public Task SaveChanges();
    }
}
