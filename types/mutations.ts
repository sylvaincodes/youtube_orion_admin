import { CategoryFormData, StoreFormData } from "./forms";

export interface PutRequestArgs {
  requestBody: StoreFormData;
  queryParams: {
    storeId: string;
  };
}

export interface PostCategoryRequest {
  requestBody: CategoryFormData;
}

export interface DeleteRequestArgs {
  queryParams: {
    storeId: string;
  };
}

export interface SwitchRequestArgs {
  queryParams: {
    userId: string;
    role: string;
  };
}
