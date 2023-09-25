const tixDAO = require('./ticket');

const createTicket = async (ticket) => {
  try {
    const newTicket = await tixDAO.createTicket(ticket);
    return newTicket;
  } catch (error) {
    console.log(error);
  }
};

const getAllTickets = async () => {
  try {
    const allTickets = await tixDAO.getAllTickets();
    return allTickets;
  } catch (error) {
    console.log(error);
  }
};

const getTicketById = async (id) => {
  try {
    const ticket = await tixDAO.getTicketById(id);
    return ticket;
  } catch (error) {
    console.log(error);
  }
};

const updateTicketById = async (id, ticket) => {
  try {
    const updatedTicket = await tixDAO.updateTicketById(id, ticket);
    return updatedTicket;
  } catch (error) {
    console.log(error);
  }
};
