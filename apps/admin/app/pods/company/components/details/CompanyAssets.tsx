interface CompanyAssetsProps {
  company: CompanyModel;
}
export const CompanyAssets = observer((props: CompanyAssetsProps) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string | string[];
  }>({
    status: ["100"],
    limit: "20",
    company_id: props.company.id?.toString() as string,
  });

  return (
    <div className="border-y-1 relative my-3 rounded-md bg-white py-2">
      <h1 className="flex flex-row pb-1 pl-3 text-xl">
        <div className="flex flex-grow">Assets</div>
      </h1>
      <ServerTableWrap<AssetModel>
        columns={columns}
        statuses={constants.asset.status}
        modelType="asset"
        filters={filters}
        applyFilters={setAppliedFilters}
        appliedFilters={appliedFilters}
        selectRows={false}
        tableExport={true}
        tableSearch={true}
      />
    </div>
  );
});

export default CompanyAssets;
