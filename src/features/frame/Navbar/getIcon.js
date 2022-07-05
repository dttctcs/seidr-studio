import { Table, Icons } from 'tabler-icons-react';

const API_TYPE_TO_ICON = {
  table: Table,
};

export function getIcon(type) {
  return API_TYPE_TO_ICON[type] || Icons;
}
