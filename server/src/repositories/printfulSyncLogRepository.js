const mockSyncLogsStore = [];

export class PrintfulSyncLogRepository {
  async logBatchSync(logData) {
    const record = {
      id: `sync_log_${Date.now()}`,
      ...logData,
      createdAt: new Date().toISOString(),
    };
    mockSyncLogsStore.push(record);
    return record;
  }

  async findByDropId(dropId) {
    return mockSyncLogsStore.filter((l) => l.dropId === dropId);
  }
}
