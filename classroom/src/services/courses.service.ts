import { Injectable } from '@nestjs/common';

import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
  slug?: string;
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

  public getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: { slug },
    });
  }

  public async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
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
