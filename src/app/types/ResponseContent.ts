export type ResponseContent<t> = {
  data?: t;
  errors?: Array<{ message: string }>;
};
