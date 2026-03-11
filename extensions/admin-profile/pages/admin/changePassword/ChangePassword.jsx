import React, { useState } from 'react';

export default function ChangePassword({ changePasswordApi }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword]         = useState('');
  const [confirm, setConfirm]                 = useState('');
  const [error, setError]                     = useState('');
  const [success, setSuccess]                 = useState(false);
  const [loading, setLoading]                 = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(changePasswordApi, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data?.error?.message || 'Error al cambiar la contraseña');
      } else {
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirm('');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content-inner">
      <div className="content-header">
        <div className="title">
          <h1>Cambiar contraseña</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="card">
          <div className="card-header">
            <h3>Actualizar contraseña de administrador</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="currentPassword" className="text-sm font-semibold">
                  Contraseña actual
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="newPassword" className="text-sm font-semibold">
                  Nueva contraseña (mín. 8 caracteres)
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="confirm" className="text-sm font-semibold">
                  Confirmar nueva contraseña
                </label>
                <input
                  id="confirm"
                  type="password"
                  className="form-control"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              {error && (
                <div className="text-critical text-sm">{error}</div>
              )}

              {success && (
                <div className="text-interactive text-sm">
                  ✓ Contraseña actualizada correctamente.
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="button primary"
                  disabled={loading}
                >
                  {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    changePasswordApi: url(routeId: "changePasswordJson")
  }
`;
