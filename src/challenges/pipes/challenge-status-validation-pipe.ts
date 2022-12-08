import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../interface';

export class ChallengeStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [ChallengeStatus.ACCEPT, ChallengeStatus.DENIED, ChallengeStatus.CANCELLED];
  transform(value: any) {
    const status = value.status.toUpperCase();
    if (!this.isValidStatus(status)) throw new BadRequestException(`${status} is an invalid status.`);
    return value;
  }
  private isValidStatus(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
