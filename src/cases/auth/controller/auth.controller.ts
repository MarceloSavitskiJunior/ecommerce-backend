import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req } from "@nestjs/common";
import { CustomerService } from "src/cases/customer/services/customer.service";
import { AuthService } from "../service/auth.service";
import type { AuthDTO, CredentialDTO } from "../dtos/auth.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    async signUp(@Body() body: { name: string; email: string; password: string }) {
        return await this.authService.signUp(body.name, body.email, body.password);
    }

    @Post("signin")
    async signin(@Body() body: CredentialDTO): Promise<AuthDTO | null> {
        return this.authService.signIn(body.email, body.password)
    }

}