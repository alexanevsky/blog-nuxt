export default ({ $auth }, inject) => {
  const hasRole = (role) => {
    return $auth.loggedIn && $auth.user.roles.includes(role);
  };

  const hasAnyRole = (roles) => {
    if (!$auth.loggedIn) {
      return false;
    }

    let result = false;

    roles.forEach((role) => {
      if ($auth.user.roles.includes(role)) {
        result = true;
      }
    });

    return result;
  };

  const isGranted = (attribute) => {
    return $auth.loggedIn && ($auth.user.securityPermissions[attribute] || false);
  };

  inject('security', {
    hasRole,
    hasAnyRole,
    isGranted
  });
};
