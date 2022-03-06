import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { GlobalErrorHandlerService } from "src/app/errors/services/global-error-handler.service";
import { ErrorHandlerInterceptor } from "./error-handler.interceptor";
import { HttpTokenService } from "./http-token.service";

export const interceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
];