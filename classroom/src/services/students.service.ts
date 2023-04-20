import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  public constructor(private readonly prisma: PrismaService) {}

  public listAllStudents() {
    return this.prisma.student.findMany();
  }

  public getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  public getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  public createStudent({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({
      data: { authUserId },
    });
  }
}
