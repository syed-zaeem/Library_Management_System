const cron = require('node-cron');
const Penalty = require('./models/Penalty');
const transactionService = require('../services/transactionService');

// Define a cron job to run daily (adjust the schedule as needed)
cron.schedule('0 0 * * *', async () => {
  try {
    const overdueTransactions = await transactionService.findOverdueTransactions(); // Implement this function

    // Apply penalties for overdue transactions
    for (const transaction of overdueTransactions) {
      // Calculate the penalty amount based on the days overdue
      const daysOverdue = /* Calculate days overdue */;
      const fineAmount = /* Calculate fine amount based on days overdue */;

      // Create a penalty entry for the user
      await Penalty.create({
        UserID: transaction.UserID,
        DaysOverdue: daysOverdue,
        FineAmount: fineAmount,
        ActionTaken: 'No further book allocation', // Or any action you wish to take
      });

      // Optionally, update the status of the transaction or handle other actions
      // await transaction.update({ status: 'Penalty Applied' });
    }

    console.log('Penalties applied successfully.');
  } catch (error) {
    console.error('Error applying penalties:', error);
  }
});
