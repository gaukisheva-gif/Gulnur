module.exports = {
  pick: jest.fn(() => Promise.resolve([])),
  pickDirectory: jest.fn(() => Promise.resolve(null)),
  isErrorWithCode: jest.fn(() => false),
  errorCodes: {OPERATION_CANCELED: 'OPERATION_CANCELED'},
  types: {
    allFiles: '*/*',
    pdf: 'application/pdf',
    images: 'image/*',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
};
