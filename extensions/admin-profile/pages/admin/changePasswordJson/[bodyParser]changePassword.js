const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { select, update } = require('@evershop/postgres-query-builder');
const {
  comparePassword,
  hashPassword
} = require('@evershop/evershop/src/lib/util/passwordHelper');
const {
  OK,
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const { currentPassword, newPassword } = request.body;
  const userId = request.session?.userID;

  if (!userId) {
    response.status(INVALID_PAYLOAD).json({
      error: { message: 'No autenticado', status: INVALID_PAYLOAD }
    });
    return;
  }

  try {
    // Load the admin user with their current password hash
    const user = await select()
      .from('admin_user')
      .where('admin_user_id', '=', userId)
      .and('status', '=', 1)
      .load(pool);

    if (!user) {
      response.status(INVALID_PAYLOAD).json({
        error: { message: 'Usuario no encontrado', status: INVALID_PAYLOAD }
      });
      return;
    }

    // Verify current password
    const isValid = comparePassword(currentPassword, user.password);
    if (!isValid) {
      response.status(INVALID_PAYLOAD).json({
        error: { message: 'La contraseña actual es incorrecta', status: INVALID_PAYLOAD }
      });
      return;
    }

    // Hash and save new password
    const hashed = hashPassword(newPassword);
    await update('admin_user')
      .given({ password: hashed })
      .where('admin_user_id', '=', userId)
      .execute(pool);

    response.status(OK);
    response.$body = { data: { success: true } };
    next();
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({
      error: { message: error.message, status: INTERNAL_SERVER_ERROR }
    });
  }
};
