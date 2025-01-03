export type Order = {
  _id: string;
  total: number;
  createdAt: string;
  store: { _id: string };
};

export type People = {
  id: number;
  designation: string;
  image: string;
  name: string;
};

export type TypeSubscriptionPlan = {
  id: number;
  type: string;
  description: string;
  title: string;
  price: number;
  period: string;

  roles: {
    title: string;
    active: boolean;
  }[];
};
