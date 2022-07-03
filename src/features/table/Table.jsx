import React from 'react';

import { DataGrid } from 'seidrui';
import { MainContentPaper } from '../../common/components/Miscellaneous/';

export function Table({ path }) {
  return (
    <MainContentPaper sx={{ height: '100%' }}>
      <DataGrid path={path + '/'} />
    </MainContentPaper>
  );
}
