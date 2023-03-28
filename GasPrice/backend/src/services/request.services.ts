/*
    Generic api request
    @param ResponseT: Response type you want to get
*/
const makeRequest = async <ResponseT, RequestT = undefined>(
  path: string,
  method: string,
  apiName: string,
  body?: RequestT,
): Promise<ResponseT> => {
  const response = await fetch(path, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok)
    throw Error(`Failed to send to ${apiName} request: ${response.status}`);

  return (await response.json()) as ResponseT;
};

export default makeRequest;
