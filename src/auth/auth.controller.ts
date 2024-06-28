import { Controller, Post, Body, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginDtoSchema } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    // Validate the DTO using Zod
    const parsedBody = LoginDtoSchema.safeParse(loginDto);

    if (!parsedBody.success) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors: parsedBody.error.errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.authService.login(parsedBody.data);
    if (!result) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return {
      statusCode: 200,
      message: 'Login successful',
      data: result,
    };
  }
}
