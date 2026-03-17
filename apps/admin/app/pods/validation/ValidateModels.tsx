import { LayerService } from "@/common_lib/services/LayerService";
import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";
import { Store } from "@/models/store/Store";
import { SimpleModal } from "@/ui/common/components/modal/SimpleModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

interface Mismatch {
  field: string;
  backend_attr: string;
  frontend_attr?: string;
  is_joined: boolean;
}

interface TableData {
  mismatches: Mismatch[];
  ts_code: string;
  public_types: string[];
}

type TSResponse = {
  ts_code: string;
  public_types: string[];
  fields: {
    [key: string]: {
      type: string;
      is_joined: boolean;
    };
  };
};

type misMatches = { [key: string]: TableData };

const nonTables = ["user", "change_log"];
const skipFields = ["created_by_name", "updated_by_name"];

export const ValidateModels = () => {
  const [misMatches, setMisMatches] = useState<misMatches>({});

  useEffect(() => {
    const fetchData = async () => {
      const mismatches: misMatches = {};
      const tables = Object.keys(Store).filter((table) => {
        if (nonTables.includes(table)) {
          return false;
        }
        if (table.startsWith("v1_")) {
          return false;
        }
        return true;
      });

      const promises = tables.map(async (table) => {
        const res = (await ServerService.callGet(
          table as keyof typeof Store,
          "_ts",
        )) as IJSONAPIType<TSResponse>;
        if (res.success && res.data) {
          const obj = Store[table as keyof typeof Store].create();
          const attrMap = obj.attrMap;

          mismatches[table] = {
            mismatches: [],
            ts_code: res.data.ts_code,
            public_types: res.data.public_types,
          };

          const keys = Object.keys(res.data.fields).filter(
            (key) => !skipFields.includes(key),
          );

          keys.forEach((field) => {
            const attrType = res.data?.fields[field];
            if (attrMap[field]) {
              if (attrMap[field].type !== attrType?.type) {
                mismatches[table]?.mismatches.push({
                  field: field,
                  backend_attr: attrType?.type || "",
                  frontend_attr: attrMap[field].type,
                  is_joined: attrType?.is_joined || false,
                });
              }
            } else {
              mismatches[table]?.mismatches.push({
                field: field,
                backend_attr: attrType?.type || "",
                frontend_attr: "Not In Frontend",
                is_joined: attrType?.is_joined || false,
              });
            }
          });

          Object.keys(attrMap)
            .filter((key) => !skipFields.includes(key))
            .forEach((field) => {
              if (
                !keys.includes(field) &&
                !attrMap[field]?.options?.noSchemaValidation
              ) {
                mismatches[table]?.mismatches.push({
                  field: field,
                  backend_attr: "Not In Backend",
                  frontend_attr: attrMap[field]?.type || "",
                  is_joined: false,
                });
              }
            });
        }
      });

      await Promise.all(promises);

      const sortedMismatches = Object.keys(mismatches)
        .sort()
        .reduce((acc, key) => {
          acc[key] = mismatches[key] || {
            mismatches: [],
            ts_code: "",
            public_types: [],
          };
          return acc;
        }, {} as misMatches);

      setMisMatches(sortedMismatches);
    };

    fetchData();
  }, []);

  const showCode = (tableName: string) => {
    LayerService.addOnly({
      id: `code-viewer-${tableName}`,
      component: CodeModal,
      props: {
        tableName: tableName,
        code: misMatches[tableName]?.ts_code || "",
        public_types: misMatches[tableName]?.public_types || [],
      },
    });
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-10">
      {Object.keys(misMatches).map((tableName) => {
        return (
          <div
            key={tableName}
            className={`flex max-w-lg flex-col rounded-md border-2 ${misMatches[tableName] && misMatches[tableName].mismatches.length > 0 ? "bg-red-200" : "bg-green-200"}`}
          >
            <h2 className="font-semibold">{tableName}</h2>
            <table className="w-full table-auto border-collapse border-b-2 border-gray-300 text-left text-xs text-gray-700">
              <thead className="sticky top-0 z-10 whitespace-nowrap border-b border-gray-300 bg-gray-50 text-sm tracking-wide shadow">
                <tr>
                  <th>Field</th>
                  <th>Backend Attr</th>
                  <th>Frontend Attr</th>
                  <th>Is Joined</th>
                </tr>
              </thead>
              <tbody>
                {misMatches[tableName]?.mismatches.map((m) => {
                  return (
                    <tr
                      key={m.field}
                      className="cursor-pointer border-y border-gray-300 bg-white odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td>{m.field}</td>
                      <td>{m.backend_attr}</td>
                      <td>{m.frontend_attr}</td>
                      <td>{m.is_joined ? "Yes" : "No"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="bg-gray-200 p-2"
              onClick={() => showCode(tableName)}
            >
              Show Code
            </button>
          </div>
        );
      })}
    </div>
  );
};

const CodeModal = observer(function CodeModal({
  tableName,
  code,
  public_types,
}: {
  tableName: string;
  code: string;
  public_types: string[];
}) {
  return (
    <SimpleModal
      id={`code-viewer-${tableName}`}
      closeHandler={() => LayerService.remove(`code-viewer-${tableName}`)}
      title={
        <h2 className="border-b p-4 text-lg font-semibold">{tableName} Code</h2>
      }
    >
      <h2 className="mb-4 font-semibold">TS Code for {tableName}</h2>
      <pre className="max-h-[70vh] overflow-auto rounded bg-gray-100 p-4">
        {code}
      </pre>
      <h2 className="mb-4 mt-6 font-semibold">Public Types for {tableName}</h2>
      <pre className="max-h-[70vh] overflow-auto rounded bg-gray-100 p-4">
        {public_types}
      </pre>
    </SimpleModal>
  );
});
