import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    console.log('User found:', user);  
    // we can use  bcrypt.compare if we use Hashed Passwords in database/seed
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    console.log('Validated user:', user);   
    if (!user) {
      return null;
    }
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    console.log('Generated access token:', accessToken);  
    return {
      access_token: accessToken,
      user,   
    };
  }
}
