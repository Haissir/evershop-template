import { select, update } from '@evershop/postgres-query-builder';
import { pool } from '@evershop/evershop/lib/postgres';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD,
  OK,
  UNAUTHORIZED
} from '@evershop/evershop/lib/util/httpStatus';
import {
  comparePassword,
  hashPassword
} from '@evershop/evershop/lib/util/passwordHelper';

export default async (request, response) => {
  const { currentPassword, newPassword } = request.body;
  // "access": "private" in route.json makes the auth middleware load the admin
  // user before this handler runs (without the password hash)
  const currentUser = request.getCurrentUser();

  if (!currentUser) {
    response.status(UNAUTHORIZED).json({
      error: { message: 'No autenticado', status: UNAUTHORIZED }
    });
    return;
  }

  try {
    const user = await select()
      .from('admin_user')
      .where('admin_user_id', '=', currentUser.admin_user_id)
      .and('status', '=', 1)
      .load(pool);

    if (!user || !comparePassword(currentPassword, user.password)) {
      response.status(INVALID_PAYLOAD).json({
        error: { message: 'La contraseña actual es incorrecta', status: INVALID_PAYLOAD }
      });
      return;
    }

    await update('admin_user')
      .given({ password: hashPassword(newPassword) })
      .where('admin_user_id', '=', user.admin_user_id)
      .execute(pool);

    response.status(OK).json({ data: { success: true } });
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({
      error: { message: error.message, status: INTERNAL_SERVER_ERROR }
    });
  }
};
