const cont = require('./cont'); 


class ContactsControllers{
    getContactsController(req, res){
        const contacts = cont.getContacts();
        res.json(contacts)
    }

    getContactsByIdController(req, res){
        const {contactId} = req.params;
        const contact = cont.getContactById(contactId)
        if (!contact) {
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        res.json(contact)
    }

    createContactController(req, res){
        const {name, email, phone} = req.body;
        if(!name || !email || !phone){
            res.status(400).json({message: 'Missing required name field'})
            return;
        }
        const newContact = cont.addContact(req.body)
        res.status(201).json(newContact);
    }

    removeContactController(req, res){
        const {contactId} = req.params;
        const contact = cont.getContactById(contactId)
        if (!contact) {
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        cont.removeContact(contactId)
        res.status(200).json({message: 'Сontact deleted'});

    }

    updateContactController(req, res){
        const {contactId} = req.params;
        const contact = cont.getContactById(contactId)
        if (!contact) {
            res.status(404).json({message: 'Contact not found'})
            return;
        }
        if(!Object.keys(req.body).length){
            res.status(400).json({message: 'Missing fields'})
            return;
        }
        const updatedContact = cont.updateContact(contactId, req.body)
        res.json(updatedContact);
    } 
}

module.exports = new ContactsControllers();