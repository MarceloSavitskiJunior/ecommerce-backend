import { Module } from "@nestjs/common";
import { CustomerModule } from "src/cases/customer/modules/customer.module";
import { SupabaseModule } from "src/lib/supabase/supabase.module";
import { AuthService } from "../service/auth.service";
import { AuthController } from "../controller/auth.controller";

@Module({
  imports: [SupabaseModule, CustomerModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
