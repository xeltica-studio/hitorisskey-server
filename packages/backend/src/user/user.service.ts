import { ulid } from 'ulid';
import { User } from '@prisma/client';

import prisma from '@/prisma.js';
import SessionService from '@/session/session.service.js';
import { config } from '@/config.js';
import InvitationsService from '@/invitations/invitations.service.js';
import { HitorisskeyError } from '@/error.js';

/**
 * ユーザーアカウントの取得・作成を担当します。
 */
export default class UserService {
  /**
   * ユーザーを作成します。
   * @param {string | null | undefined} code 招待コード
   * @return {Promise<User>} 作成したユーザー。
   */
  static async createUserAsync(code?: string | null): Promise<User> {
    if (config.is_closed_beta) {
      if (!(await InvitationsService.tryUseAsync(code))) {
        throw new HitorisskeyError('INVITATION_CODE_REQUIRED');
      }
    }
    const token = SessionService.generateToken();
    return prisma.user.create({
      data: {
        id: ulid(),
        token,
      },
    });
  }
  /**
   * ユーザーを削除します。
   * @param {string} [id] - ユーザー ID。
   */
  static async deleteUserAsync(id: string): Promise<void> {
    await prisma.user.delete({where: {id}});
  }

  /**
   * 指定したIDに対応するユーザーを取得します。
   * @param {string} [id] - ユーザー ID。
   * @return {Promise<User>} 取得したユーザー。
   */
  static getUserByIdAsync(id: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: {id},
    });
  }
}