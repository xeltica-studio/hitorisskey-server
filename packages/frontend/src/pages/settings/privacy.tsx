import { Component } from 'solid-js';

import { useTitle } from '../../hooks/use-title';
import { $t } from '../../text';

const SettingsPrivacy: Component = () => {
  useTitle([{
    label: $t.settings,
    link: '/settings',
  }, $t.$settings.privacy]);

  return (
    <p>{$t.underDevelopment}</p>
  );
};

export default SettingsPrivacy;
