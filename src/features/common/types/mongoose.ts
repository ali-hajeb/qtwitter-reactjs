export type MongooseQuery = {
  filter: object;
  limit: number;
  skip: number;
  sort: {
    [field: string]: number;
  };
};
