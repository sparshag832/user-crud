export const successResponse = (status?: any) => {
  return {
    status: status ?? "OK",
  };
};

export const successResponseWithData = (data?: any) => {
  return {
    data: data || undefined,
    status: "OK",
  };
};
