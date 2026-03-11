import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@heroicons/react/solid/esm/KeyIcon';
import NavigationItemGroup from '@components/admin/cms/NavigationItemGroup';

export default function ProfileMenuGroup({ changePasswordPage }) {
  return (
    <NavigationItemGroup
      id="profileMenuGroup"
      name="Mi perfil"
      items={[
        {
          Icon,
          url: changePasswordPage,
          title: 'Cambiar contraseña'
        }
      ]}
    />
  );
}

ProfileMenuGroup.propTypes = {
  changePasswordPage: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 90
};

export const query = `
  query Query {
    changePasswordPage: url(routeId: "changePassword")
  }
`;
