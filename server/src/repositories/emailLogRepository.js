const mockEmailLogsStore = [];

export class EmailLogRepository {
  async logEmail(emailData) {
    const record = {
      id: `email_log_${Date.now()}`,
      ...emailData,
      createdAt: new Date().toISOString(),
    };
    mockEmailLogsStore.push(record);
    return record;
  }

  async findByRecipient(recipientEmail) {
    return mockEmailLogsStore.filter((e) => e.recipientEmail === recipientEmail);
  }
}
