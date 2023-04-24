import { ReactNode } from "react";

import { Empty } from "@/components/empty";

interface TableProps<Entry extends Record<string, any>> {
  data: Entry[];
  columns: {
    title: string;
    field: Extract<keyof Entry, string>;
    renderCell?: ({ entry }: { entry: Entry }) => ReactNode;
  }[];
}

export function Table<Entry extends Record<string, any>>({
  data,
  columns,
}: TableProps<Entry>) {
  if (!data?.length) {
    return <Empty />;
  }
  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b border-tertiary">
          <tr>
            {columns.map((column, i) => (
              <th
                key={`column-${i}`}
                scope="col"
                className="px-6 py-3 text-sm font-medium text-secondary tracking-wider text-left whitespace-nowrap uppercase"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={i} className="odd:bg-white even:bg-white">
              {columns.map(({ renderCell, field, title }, j) => (
                <td
                  key={`data-${i}-${j}`}
                  className="px-6 py-6 border-b border-tertiary whitespace-nowrap"
                >
                  {renderCell ? renderCell({ entry }) : entry[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
