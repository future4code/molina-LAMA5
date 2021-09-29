import { UserBusiness } from "../src/business/UserBusiness";
import { NotFoundError } from "../src/error/NotFoundError";
import { User, UserInputDTO, UserRole } from "../src/model/User";

const userDataBase = {
    createUser: jest.fn(async (user: User) => {}),
    getUserByEmail: jest.fn((email: string) => {
        if(email === "teste@email.com"){
            return User.toUserModel({
                id: "id_usuario",
                name: "nome_usuario",
                email,
                password: "123456",
                role: UserRole.ADMIN
            })
        }else{
            throw new NotFoundError(`Não encontrado usuario com email ${email}`)
        }
    })
}

const authenticator = {
    generateToken: jest.fn((payload: {id: string, role: UserRole}) => "token_usuario"),
    getData: jest.fn((token: string) => {
        switch(token){
            case "userToken":
                return {id: "id_do_token", role: "NORMAL"}
            case "adminToken":
                return {id: "id_do_token", role: "ADMIN"}
            default:
                return undefined
        }
    })
}

const idGenerator = {
    generate: jest.fn(() => "eu_amo_backend")
}

const hasManager = {
    hash: jest.fn(() => "labenu_secret_pass_hash"),
    compare: jest.fn((text: string, hash: string) => text === "123123" ? true: false)
}

const userBusiness = new UserBusiness(
    userDataBase as any,
    idGenerator as any,
    hasManager as any,
    authenticator as any
)

describe("Signup Test", () => {
    test.skip("Deve retornar error se formato de email estiver errado", async() => {
        expect.assertions(2)

        const user = {
            email: "emailteste.com",
            name: "Labenu",
            password: "123123",
            role: "NORMAL"
        } as UserInputDTO

        try{
            await userBusiness.createUser(user)
        }catch(error){
            expect(error.message).toBe("Formato de e-mail inválido")
            expect(error.code).toBe(417)
        }
    })

    test.skip("Deve retornar error quando estiver formato errado do role", async() => {
        expect.assertions(1)

        const user = {
            email: "email@teste.com",
            name: "Labenu",
            password: "123123",
            role: "qualquer"
        } as UserInputDTO

        try{
            await userBusiness.createUser(user)
        }catch (error) {
            expect(error.message).toBe("role deve ser 'ADMIN' ou 'NORMAL'")
        }
    })
    test.skip("Deve retornar error quando password estiver menor que 6 digitos", async() => {
        expect.assertions(2)

        const user = {
            email: "email@teste.com",
            name: "Labenu",
            password: "12312",
            role: "ADMIN"
        } as UserInputDTO

        try{
            await userBusiness.createUser(user)
        }catch (error) {
            expect(error.message).toBe("A senha deve ser igual ou superior a 6 digitos")
            expect(error.code).toBe(417)
        }
    })
    test.skip("Deve retornar error quando estiver sem o password", async() => {
        expect.assertions(2)

        const user = {
            email: "email@teste.com",
            name: "Labenu",
            role: "ADMIN"
        } as UserInputDTO

        try{
            await userBusiness.createUser(user)
        }catch (error) {
            expect(error.message).toBe("Todos os campos devem ser preenchidos")
            expect(error.code).toBe(417)
        }
    })
    test("Deve retornar error quando email estiver vazio", async() => {
        expect.assertions(2)

        const user = {
            email: "",
            name: "Labenu",
            password: "12312",
            role: "ADMIN"
        } as UserInputDTO

        try{
            await userBusiness.createUser(user)
        }catch (error) {
            expect(error.message).toBe("Todos os campos devem ser preenchidos")
            expect(error.code).toBe(417)
        }
    })
    test("Deve retornar error quando nome estiver vazio", async() => {
        expect.assertions(2)

        const user = {
            email: "email@teste.com",
            name: "",
            password: "12312",
            role: "ADMIN"
        } as UserInputDTO

        try{
            await userBusiness.createUser(user)
        }catch (error) {
            expect(error.message).toBe("Todos os campos devem ser preenchidos")
            expect(error.code).toBe(417)
        }
    })
    test("Deve retornar error quando role estiver vazio", async() => {
        expect.assertions(2)

        const user = {
            email: "email@teste.com",
            name: "Labenu",
            password: "12312",
            role: ""
        } as UserInputDTO

        try{
            await userBusiness.createUser(user)
        }catch (error) {
            expect(error.message).toBe("Todos os campos devem ser preenchidos")
            expect(error.code).toBe(417)
        }
    })
})