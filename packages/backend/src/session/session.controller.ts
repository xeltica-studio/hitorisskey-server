import type { FastifyRequest } from 'fastify';
import { Controller, GET, POST } from 'fastify-decorators';
import { User } from '@prisma/client';

import { ControllerBase } from '@/controller-base.js';
import { HitorisskeyError } from '@/error.js';
import SessionService from '@/session/session.service.js';
import UserService from '@/user/user.service.js';
import { emailPasswordParam, EmailPasswordParam } from './models/email-password-param.js';
import { startParam, StartParam } from './models/start-param.js';

@Controller('/session')
export default class SessionController extends ControllerBase {
  @GET()
  async readAsync(req: FastifyRequest) {
    const user = await this.getSessionUserAsync(req, true);
    return this.filter(user);
  }

  @POST('/start')
  async startAsync(req: FastifyRequest<{Body: StartParam}>) {
    const body = startParam.safeParse(req.body);
    if (!body.success) throw new HitorisskeyError('MISSING_PARAMS');

    const user = await UserService.createUserAsync(body.data?.invitationCode);
    return this.filter(user);
  }

  @POST('/login')
  async loginAsync(req: FastifyRequest<{Body: EmailPasswordParam}>) {
    const body = emailPasswordParam.safeParse(req.body);
    if (!body.success) throw new HitorisskeyError('MISSING_PARAMS');

    const u = await SessionService.loginAsync(body.data.email, body.data.password);
    return this.filter(u);
  }

  @POST('/signup')
  async signupAsync(req: FastifyRequest<{Body: EmailPasswordParam}>) {
    const user = await this.getSessionUserAsync(req, true);
    const body = emailPasswordParam.safeParse(req.body);
    if (!body.success) throw new HitorisskeyError('MISSING_PARAMS');
    
    const u = await SessionService.signupAsync(user, body.data.email, body.data.password);
    return this.filter(u);
  }

  private filter(user: User) {
    return {
      id: user.id,
      created_at: user.created_at,
      email: user.email,
      token: user.token,
      role: user.role,
    };
  }
}
