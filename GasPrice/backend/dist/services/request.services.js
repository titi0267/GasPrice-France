"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Generic api request
    @param ResponseT: Response type you want to get
*/
const makeRequest = async (path, method, apiName, body) => {
    const response = await fetch(path, {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok)
        throw Error(`Failed to send to ${apiName} request: ${response.status}`);
    return (await response.json());
};
exports.default = makeRequest;
//# sourceMappingURL=request.services.js.map