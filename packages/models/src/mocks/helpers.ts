import { ServerService } from "@/common_lib/services/ServerService";

export const addMock = <T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data: T,
  params: { [key: string]: any } = {},
) => {
  ServerService.addMock<T>({
    method: method,
    path: path,
    params: params,
    response: {
      statusCode: 200,
      success: true,
      error: "",
      data: data,
    },
  });
};
