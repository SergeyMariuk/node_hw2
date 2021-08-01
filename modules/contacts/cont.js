const fs = require('fs');

const getContactsFromDb = () => {
    return JSON.parse(fs.readFileSync('db/contacts.json', {encoding: 'utf-8'}))
}

const saveContactsToDb = contacts => {
    fs.writeFileSync('db/contacts.json', JSON.stringify(contacts))
}


class Contacts{ 
    constructor(){
        this.contacts = getContactsFromDb();
    }

    setContacts(contact){
        this.contacts.push(contact);
        saveContactsToDb(this.contacts)
    }

    getContacts(){
        return [...this.contacts]
    }

    getContactById(contactId){
        const contact = this.contacts.find(contact => contact.id === Number(contactId));
        return contact || null;
    }

    addContact(name, phone, email){
        const newContact = {
            id: [...this.contacts].pop().id+1,
            name,
            email,
            phone,
        }
        this.setContacts(newContact);
        return newContact;
    }

    removeContact(contactId){
        this.contacts = this.contacts.filter(contact => contact.id != Number(contactId));
        saveContactsToDb(this.contacts)
    }

    updateContact(contactId, body){
        let tmpContact = {}
        this.contacts = this.contacts.map(contact => {
            if(contact.id === Number(contactId)){
                body.name ? contact.name = body.name : contact.name = contact.name;
                body.email ? contact.email = body.email : contact.email = contact.email;
                body.phone ? contact.phone = body.phone : contact.phone = contact.phone;
                saveContactsToDb(this.contacts);
                tmpContact = contact;
            }
        })
        return tmpContact;
    }
}

module.exports = new Contacts();