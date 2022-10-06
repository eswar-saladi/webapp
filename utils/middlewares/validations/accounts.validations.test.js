const { isValidUpdateDetails } = require("./accounts");

describe("Account Update Validation middleware", () => {
  const mockNext = () => {
    const next = jest.fn();
    return next;
  };

  const mockRequest = (body) => ({
    body,
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    mockReq = mockRequest({});
    mockRes = mockResponse();
  });

  test("should return 400 status is id in update route", async () => {
    const expectedResponse = { error: "Invalid fields identified" };
    mockReq.body = { id: 1 };
    await isValidUpdateDetails(mockReq, mockRes, mockNext);
    expect(mockRes.json).toBeCalledWith(expectedResponse);
  });
});
