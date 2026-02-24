import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
    constructor(private readonly cls: ClsService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        // In production, this would come from the JWT payload
        // For now, we'll allow an 'x-organization-id' header for development/testing
        const organizationId = request.headers['x-organization-id'] || request.user?.organizationId;

        if (organizationId) {
            this.cls.set('organizationId', organizationId);
        }

        return next.handle();
    }
}
