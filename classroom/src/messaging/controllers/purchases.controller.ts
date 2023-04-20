import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';

interface PurchaseCreatedPayload {
  customer: {
    authUserId: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
  };
}

@Controller()
export class PurchasesController {
  public constructor(
    private readonly studentsService: StudentsService,
    private readonly coursesServices: CoursesService,
    private readonly enrollmentsServices: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  public async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesServices.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesServices.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentsServices.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
