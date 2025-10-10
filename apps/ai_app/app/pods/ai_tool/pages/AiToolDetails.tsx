import { SafeBaseModel } from "@/models/BaseModel";
import { AiToolModel } from "@/models/models/ai_tool/model/AiToolModel";
import { MetaData } from "@/models/models/ai_tool/model/MetaData";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { Store } from "@/models/store/Store";
import { DetailFieldArray } from "@/ui/common/components/form/details/DetailFieldArray";
import { DetailFieldCheckbox } from "@/ui/common/components/form/details/DetailFieldCheckbox";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import DetailFieldModelSelect from "@/ui/common/components/form/details/DetailFieldModelSelect";
import DetailFieldText from "@/ui/common/components/form/details/DetailFieldText";
import DetailFieldTextArea from "@/ui/common/components/form/details/DetailFieldTextArea";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

//interface AiToolDetailProps {}

export const AiToolDetails = observer(function AiToolDetails() {
  const [record, setRecord] = useState<AiToolModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.ai_tool.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <div className="bg-gray-50 p-4">
        {/* Basic Information */}
        <DetailFieldContainer>
          <DetailFieldText
            record={record}
            field="name"
            label="Name"
            placeholder="AI Tool Name"
            helpText="The name of the AI tool"
          />
          <DetailFieldText
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="tagline"
            label="Tagline"
            placeholder="Brief tagline"
            helpText="Short promotional tagline for the tool"
          />
          <DetailFieldCheckbox
            record={record}
            field="is_featured"
            label="Featured"
            helpText="Whether this tool should be featured prominently"
          />
        </DetailFieldContainer>

        {/* Description & Content */}
        <DetailFieldContainer>
          <DetailFieldTextArea
            record={record}
            field="description"
            label="Description"
            placeholder="Tool description..."
            helpText="Main description of the AI tool"
            rows={4}
          />
          <DetailFieldTextArea
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="introduction"
            label="Introduction"
            placeholder="Detailed introduction..."
            helpText="Detailed introduction to the tool"
            rows={4}
          />
          <DetailFieldTextArea
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="how_it_works"
            label="How It Works"
            placeholder="Explain how the tool works..."
            helpText="Explanation of how the tool functions"
            rows={4}
          />
        </DetailFieldContainer>

        {/* URLs & Links */}
        <DetailFieldContainer>
          <DetailFieldText
            record={record}
            field="website_url"
            label="Website URL"
            placeholder="https://example.com"
            helpText="Main website URL for the tool"
          />
          <DetailFieldText
            record={record}
            field="affiliate_url"
            label="Affiliate URL"
            placeholder="https://affiliate.example.com"
            helpText="Affiliate/referral URL if applicable"
          />
          <DetailFieldText
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="logo"
            label="Logo URL"
            placeholder="https://example.com/logo.png"
            helpText="URL to the tool's logo image"
          />
        </DetailFieldContainer>

        {/* Benefits & Applications */}
        <DetailFieldContainer>
          <DetailFieldArray
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="benefits"
            label="Key Benefits"
            placeholder="Add a key benefit..."
            helpText="Main benefits and advantages of using this tool"
          />
          <DetailFieldArray
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="applications"
            label="Applications"
            placeholder="Add an application..."
            helpText="Use cases and applications for this tool"
          />
        </DetailFieldContainer>

        {/* Pricing Information */}
        <DetailFieldContainer>
          <DetailFieldCheckbox
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="free_tier"
            label="Has Free Tier"
            helpText="Whether the tool offers a free tier or plan"
          />
          <DetailFieldText
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="price_range"
            label="Price Range"
            placeholder="$10-100/month"
            helpText="General pricing range for the tool"
          />
          <DetailFieldTextArea
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="price_options"
            label="Pricing Options"
            placeholder="Describe pricing tiers..."
            helpText="Detailed description of pricing options and tiers"
            rows={3}
          />
        </DetailFieldContainer>

        {/* Categorization */}
        <DetailFieldContainer>
          <DetailFieldModelSelect<AiToolModel, CategoryModel>
            record={record}
            field="category_id"
            label="Category"
            placeholder="Select category"
            modelName="category"
            modelDisplayField="name"
            modelSearchField="name"
            helpText="Primary category for this AI tool"
            showClear={true}
          />
          <DetailFieldModelSelect<AiToolModel, CategoryModel>
            record={record}
            field="business_function_category_id"
            label="Business Function Category"
            placeholder="Select business function"
            modelName="category"
            modelDisplayField="name"
            modelSearchField="name"
            helpText="Business function category for this tool"
            showClear={true}
          />
          <DetailFieldText
            record={record.meta_data as SafeBaseModel<MetaData>}
            parentRecord={record}
            field="target_audience"
            label="Target Audience"
            placeholder="Developers, Marketers, etc."
            helpText="Primary target audience for this tool"
          />
        </DetailFieldContainer>
      </div>
    </>
  );
});
