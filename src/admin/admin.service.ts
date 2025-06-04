import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { password, ...rest } = createAdminDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({
      ...rest,
      password: hashedPassword,
    });
    return this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }
    const updated = Object.assign(admin, updateAdminDto);
    return this.adminRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const usuario = await this.findOne(id);
    await this.adminRepository.remove(admin);
    return { message: `Administrador con ID ${id} eliminado` };
  }
}
