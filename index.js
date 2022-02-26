const { Command } = require("commander");
const { list, add, get, remove } = require("./contacts");

const program = new Command();
program
	.requiredOption("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const contacts = await list();
			console.log(contacts);
			break;
		case "get":
			const contactById = await get(id);
			if (contactById) {
				console.log("Contact found");
				console.log(contactById);
				return;
			}
			console.log("Contact not found");
			break;
		case "add":
			const contact = await add(name, email, phone);
			console.log("Add new contact");
			console.log(contact);
			break;
		case "remove":
			const removeContact = await remove(id);
			console.log("Remove contact");
			console.log(removeContact);
			break;
		default:
			console.warn("\x1B[31m Unknown action type!");
	}
};

invokeAction(argv);
