const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function list() {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
}

async function get(id) {
	const contacts = await list();
	const result = contacts.find((item) => item.id === id);
	if (!result) {
		return null;
	}
	return result;
}

async function add(name, email, phone) {
	const data = { id: v4(), name, email, phone };
	const contacts = await list();
	contacts.push(data);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return data;
}

async function remove(id) {
	const contacts = await list();
	const idx = contacts.findIndex((item) => item.id === id);
	if (idx === -1) {
		return null;
	}
	const [removeContact] = contacts.splice(idx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removeContact;
}

module.exports = {
	list,
	get,
	add,
	remove,
};
