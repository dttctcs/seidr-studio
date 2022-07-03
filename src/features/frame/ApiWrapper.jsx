import React from 'react';

import { ScrollArea } from '../../common/components/Miscellaneous';
import { Table } from '../table';

export function ApiWrapper(api) {
  const getComponent = (api) => {
    if (api.type === 'crud') {
      return <Table key={api.path} {...api} />;
    }
  };

  return <ScrollArea style={{ flex: 1, flexDirection: 'column' }}>{getComponent(api)}</ScrollArea>;
}
