import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerService } from "src/cases/customer/services/customer.service";
import { SupabaseService } from "src/lib/supabase/supabase.service";
import { AuthDTO, UserDTO } from "../dtos/auth.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly supabaseService: SupabaseService,
        private customerService: CustomerService
    ) { }

    async signUp(name: string, email: string, password: string): Promise<UserDTO> {
        const supabaseUser = await this.supabaseService.signUp(email, password);

        const customer = await this.customerService.save({
            name,
            supabaseId: supabaseUser.id
        })

        return {
            id: customer.id!,
            name: customer.name!,
            email: supabaseUser.email!,
            supabaseId: supabaseUser.id
        }
    }
    
    async signIn(email: string, password: string): Promise<AuthDTO> {
        try {
            const supabaseData = await this.supabaseService.signIn(email, password);

            const customer = await this.customerService.findBySupabaseId(supabaseData.user.id)

            return {
                accessToken: supabaseData.session.access_token,
                user: {
                    id: customer?.id!,
                    name: customer?.name!,
                    email: supabaseData.user.email!,
                    supabaseId: supabaseData.user.id
                }
            }
        } catch(error) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: error.message || 'Credencial inválida.'
            }, 
            HttpStatus.UNAUTHORIZED)
        }
    }
}