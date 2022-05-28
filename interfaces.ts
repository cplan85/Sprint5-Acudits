export interface RequestOption {
  method: string;
  headers: Headers;
  redirect: RequestRedirect;
}

export interface jokeData {
  id: string;
  joke: string;
  status: number;
}
