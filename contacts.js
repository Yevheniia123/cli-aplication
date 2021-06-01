const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  (async () => {
    const data = await fs.readFile(contactsPath, "utf8");
    const content = JSON.parse(data);
    console.table(content);
  })();
}

function getContactById(contactId) {
  (async () => {
    const data = await fs.readFile(contactsPath, "utf8");
    const content = JSON.parse(data);
    for (const i of content) {
      if (i.id === Number(contactId)) {
        console.table(i);
      }
    }
  })();
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const content = JSON.parse(data);

  const result = content.filter((person) => person.id !== Number(contactId));
  console.log(`person with id:${contactId} removed from the list `);
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2), "utf8");
  console.table(result);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const content = JSON.parse(data);

  let id = nanoid(10);

  const newContact = { id, name, email, phone };
  content.push(newContact);

  const writeData = await fs.writeFile(
    contactsPath,
    JSON.stringify(content, null, 2),
    (err) => {
      if (err) throw err;
    }
  );
  console.log(`contact ${name} added to the list `);
  console.table(content);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
