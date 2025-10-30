import { ServerService } from "@/common_lib/services/ServerService";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { MultiSelectInput } from "@/ui/common/components/fields/MultiSelectInput";
import FormFieldWrap from "@/ui/common/components/form/fields/FormFieldWrap";
import { Button } from "@/ui/shadcn/ui/button";
import { getPublicEnvVar } from "@/utils/env";
import { formatPercent } from "@/utils/numbers";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";

interface SyncData {
  model?: string;
  total?: number;
  current?: number;
  current_model_number?: number;
  total_models?: number;
  error?: string;
}

interface ModelStat {
  model: string;
  total: number;
  current: number;
  errors: string[];
}

export const FullSyncPage = observer(() => {
  const [onlyPackages, setOnlyPackages] = useState<string[]>([]);
  const [models, setModels] = useState<{ [key: string]: ModelStat }>({});
  const [currentModel, setCurrentModel] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [totalModels, setTotalModels] = useState<number>(0);
  const [currentModelNumber, setCurrentModelNumber] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fullSync = async () => {
    if (
      !window.confirm(
        "Are you sure you want to start a full sync? it will erase the tables before proceeding.",
      )
    ) {
      return;
    }

    if (syncing) {
      console.warn("Sync already in progress");
      return;
    }
    setSyncing(true);
    abortControllerRef.current = new AbortController();
    ServerService.streamPost(
      "sync",
      "full_sync",
      { only_packages: onlyPackages },
      {
        signal: abortControllerRef.current.signal,
        onmessage: (event) => {
          if (event.data != "") {
            const data: SyncData = JSON.parse(event.data);
            if (data.model) {
              setCurrentModel(data.model);

              setModels((prev) => {
                const model = prev[data.model || ""] || {
                  model: data.model || "",
                  total: 0,
                  current: 0,
                  errors: [],
                };
                if (data.total) {
                  model.total = data.total;
                }
                if (data.current) {
                  model.current = data.current;
                }
                if (data.error) {
                  model.errors.push(data.error);
                }

                return { [model.model]: model, ...prev };
              });
            }
            if (data.total_models) {
              setTotalModels(data.total_models);
            }
            if (data.current_model_number) {
              setCurrentModelNumber(data.current_model_number);
            }
          }
        },
        onerror: (error) => {
          console.error("Error in stream:", error);
        },
        onopen: async (response: Response) => {
          console.log("Stream opened successfully", response);
        },
        onclose: () => {
          console.log("Stream closed");
          setSyncing(false);
          abortControllerRef.current = null;
        },
      },
    );
  };

  if (getPublicEnvVar("PUBLIC_ENVIRONMENT") == "production") {
    return (
      <div className="p-5">
        <div className="font-semibold text-red-500">
          Full sync is not available in production environment.
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminTitleBar title="Full System Sync" />
      <div className="p-5">
        <div className="flex flex-col">
          <div className="mb-4 flex flex-row items-center gap-2 rounded-xl border bg-white p-4">
            <div className="ml-auto flex flex-row items-center gap-4">
              <Button onClick={fullSync} variant={"destructive"}>
                Start Full Sync
              </Button>
            </div>
          </div>
          <FormFieldWrap label="Only Sync Packages">
            <MultiSelectInput
              values={onlyPackages}
              options={Object.keys(Store)
                .sort()
                .map((key) => ({
                  id: key,
                  label: key,
                }))}
              handleChange={(set) => {
                setOnlyPackages(set.map((item) => item.id.toString()));
              }}
            />
          </FormFieldWrap>
        </div>

        {syncing && <div>Syncing...</div>}
        {currentModel && (
          <div className="mb-4 flex flex-row items-center gap-2 rounded-xl bg-white p-4">
            Current Model: {currentModel} ({currentModelNumber}/{totalModels})
          </div>
        )}
        {Object.entries(models).map(([model, stat]) => (
          <div key={model} className="grid grid-cols-3 gap-2 border-b p-2">
            <div className="font-semibold">{model}</div>
            <div className="flex flex-row items-center gap-2">
              <span>
                {stat.current}/{stat.total}
              </span>
              <span>
                {stat.current == stat.total ? (
                  <i className="fa fa-check text-success-500" />
                ) : (
                  formatPercent(stat.current / (stat.total || 1), 0)
                )}
              </span>
            </div>
            <div></div>
            {stat.errors.map((error, index) => (
              <div key={index} className="col-span-3 text-fg-error-primary">
                Error: {error}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
});
