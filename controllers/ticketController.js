const tixDAO = require('./ticketDAO');

// Use async to create a function for creating tickets by the user
const createTicket = async (ticket) => {
  try {
    const newTicket = await tixDAO.createTicket(ticket);
    return newTicket;
  } catch (error) {
    console.log(error);
  }
};

// Use async to create a function for getting all tickets
const getAllTickets = async () => {
  try {
    const allTickets= await tixDAO.getAllTickets();
    return allTickets;
  } catch (error) {
    console.log(error);
  }
};

// Use async to create a function for getting a ticket by id
const getTicketById = async (id) => {
  try {
    const ticket = await tixDAO.getTicketById(id);
    return ticket;
  }  (error) {
    console.log(error);
  }
};

// Use async to create a function for updating a ticket by id
const updateTicketById = async (id, ticket) => {
  try {
    const updatedTicket = await tixDAO.updateTicketById(id, ticket);
    return updatedTicket;
  } catch (error) {
    console.log(error);
  }};

// Use