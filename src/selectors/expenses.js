const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch = (
      typeof startDate != 'number' ||
      startDate <= expense.createdAt
    );
    const endDateMatch = (
      typeof endDate != 'number' ||
      expense.createdAt <= endDate
    );
    const textMatch = (
      typeof text !== 'string' ||
      (
        typeof expense.description === 'string' &&
        expense.description.toLowerCase().includes(text.toLowerCase())
      )
    );
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt > b.createdAt ? -1 : 1;
    }
    if (sortBy === 'amount') {
      return a.amount > b.amount ? -1 : 1;
    }
  });
};

export default getVisibleExpenses;