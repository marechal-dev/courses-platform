import { Injectable } from '@nestjs/common';

import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  public constructor(private readonly prisma: PrismaService) {}

  public listAllCourses() {
    return this.prisma.course.findMany();
  }

  public getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  public async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists.');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
