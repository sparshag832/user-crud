export interface UserInterface {
    userId: string,
    email: string,
    name: string,
    isDeleted: boolean,
    createdAt: Date

}
export interface CreateUserData {
    email: string,
    name: string,
    password: string,
}

export interface UserGetAndFilterType  {
    pageSize: number;
    pageNumber: number;
    search: string
}

export type PagingType = {
    pageSize: number;
    pageNumber: number;
};

export interface LoginReq {
    email: string,
    password: string
}

export interface UserListReaponse {
    data: UserInterface[];
    count: number;
}
