import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Student } from '../models/student';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { StudentsService } from '../../../services/students.service';
import { EnrollmentsService } from '../../../services/enrollments.service';

@Resolver(() => Student)
export class StudentsResolver {
  public constructor(
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id);
  }
}
