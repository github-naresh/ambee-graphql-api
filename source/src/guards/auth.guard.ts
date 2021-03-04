import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { decode } from 'jsonwebtoken';
import { JwtToken } from '~interfaces/jwt-token.interface';
import { AwsService } from '~modules/core/aws.service';
import { ConfigService } from '~modules/core/config.service';
import { EnvService } from '~modules/core/env.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  constructor(
    private reflector: Reflector,
    @Inject(AwsService) private awsService: AwsService,
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(EnvService) private envService: EnvService,

  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    if(this.envService.get('ALLOW_AUTH_BYPASS')){
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;
    const scope = this.reflector.get<string>('scope', ctx.getHandler());
    const authorizationHeader = ('headers' in request && 'authorization' in request.headers) ? request.headers.authorization : '';
    const authToken = authorizationHeader.split(' ');
    if (authToken.length !== 2 || authToken[0].toLowerCase() !== 'bearer') {
      return false;
    }
    const token = authToken[1];
    this.configService.set('token', token);
    const resp: JwtToken = decode(token) as JwtToken;

    this.verifyExpired(resp);
    this.verifyScope(resp, scope);
    return true;
  }

  verifyExpired(token: JwtToken) {
    if(Date.now() > (token.exp * 1000)){
      throw new ForbiddenException(`Token expired.`);
    }
  }
  
  verifyScope(token: JwtToken, scope: string) {
    if (scope !== '' && scope !== undefined && scope !== null) {
      const scopes = token.scope.split(' ');
      if (!scopes.includes(scope)) {
        throw new ForbiddenException(`Operation not permitted. Expecting scope ${scope}`);
      }
    }
    return this;
  }
}