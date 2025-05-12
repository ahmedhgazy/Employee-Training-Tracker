package com.training.employee_service.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Pointcut("execution(* com.training.employee_service.controllers.*.*(..))")
    public void controllerMethods() {}

    @Pointcut("execution(* com.training.employee_service.services.*.*(..))")
    public void serviceMethods() {}

    @Before("controllerMethods()")
    public void logBeforeControllerMethodCall(JoinPoint joinPoint) {
        log.info("Controller Method Called: {} with arguments: {}", 
                joinPoint.getSignature().getName(), 
                Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logAfterServiceMethodCall(JoinPoint joinPoint, Object result) {
        log.info("Service Method Completed: {} with result: {}", 
                joinPoint.getSignature().getName(), 
                result);
    }

    @AfterThrowing(pointcut = "controllerMethods() || serviceMethods()", throwing = "exception")
    public void logAfterException(JoinPoint joinPoint, Exception exception) {
        log.error("Exception in {}.{}: {} - {}",
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                exception.getClass().getSimpleName(),
                exception.getMessage());
    }

    @Around("controllerMethods() || serviceMethods()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long endTime = System.currentTimeMillis();
        
        log.info("Method Execution Time: {}.{} - {} ms", 
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                (endTime - startTime));
        
        return result;
    }
}
