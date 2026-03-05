export type LoginPaylod = {
    role: "admin" | "member";
}
export type LoginResponse = {
    id: string,
    name: string,
    role: "admin" | "member"
}


export const fakeLoginApi = async (payload: LoginPaylod): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (payload.role === "member") {
                resolve({
                    id: "2",
                    name: "userr",
                    role: "member",
                });
            } else if (payload.role === "admin") {
                resolve({
                    id: "1",
                    name: "Admin userr",
                    role: "admin",
                });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1500);
    });
}