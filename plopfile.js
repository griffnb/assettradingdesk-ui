module.exports = function (plop) {
  const abortOnFail = false;

  plop.setGenerator("form-modal", {
    description: "Create a Form Modal",
    prompts: [
      {
        type: "input",
        name: "destpath",
        message: "What is this Modals's Path?",
      },
      {
        type: "input",
        name: "name",
        message: "What is this Modals's name?",
      },
    ],
    actions: function () {
      var actions = [];

      actions.push({
        type: "add",
        path: "{{destpath}}/{{pascalCase name}}.tsx",
        templateFile: "plop_blueprints/FormModal.tsx.hbs",
      });

      return actions;
    },
  });
  plop.setGenerator("simple-modal", {
    description: "Create a Simple Modal",
    prompts: [
      {
        type: "input",
        name: "destpath",
        message: "What is this Modals's Path?",
      },
      {
        type: "input",
        name: "name",
        message: "What is this Modals's name?",
      },
    ],
    actions: function () {
      var actions = [];

      actions.push({
        type: "add",
        path: "{{destpath}}/{{pascalCase name}}.tsx",
        templateFile: "plop_blueprints/SimpleModal.tsx.hbs",
      });

      return actions;
    },
  });

  plop.setGenerator("simple-data-modal", {
    description: "Create a Simple Data Modal",
    prompts: [
      {
        type: "input",
        name: "destpath",
        message: "What is this Modals's Path?",
      },
      {
        type: "input",
        name: "name",
        message: "What is this Modals's name?",
      },
    ],
    actions: function (data) {
      var actions = [];

      actions.push({
        type: "add",
        path: "{{destpath}}/{{pascalCase name}}.tsx",
        templateFile: "plop_blueprints/SimpleDataModal.tsx.hbs",
      });
      actions.push({
        type: "add",
        path: "{{destpath}}/{{pascalCase name}}View.tsx",
        templateFile: "plop_blueprints/ObservableViewComponent.tsx.hbs",
        data: { ...data, view: "view" },
      });

      return actions;
    },
  });

  plop.setGenerator("data-component", {
    description: "Create a Data Component",
    prompts: [
      {
        type: "input",
        name: "destpath",
        message: "What is this component's Path?",
      },
      {
        type: "input",
        name: "name",
        message: "What is this component's name?",
      },

      {
        type: "confirm",
        name: "observable",
        message: "Is this observable?",
        default: true,
      },
    ],
    actions: function (data) {
      var actions = [];

      if (data.observable) {
        actions.push({
          type: "add",
          path: "{{destpath}}/{{pascalCase name}}.tsx",
          templateFile: "plop_blueprints/DataComponent.tsx.hbs",
        });
        actions.push({
          type: "add",
          path: "{{destpath}}/{{pascalCase name}}View.tsx",
          templateFile: "plop_blueprints/ObservableViewComponent.tsx.hbs",
          data: { ...data, view: "view" },
        });
      } else {
        actions.push({
          type: "add",
          path: "{{destpath}}/{{pascalCase name}}.tsx",
          templateFile: "plop_blueprints/DataComponent.tsx.hbs",
        });
        actions.push({
          type: "add",
          path: "{{destpath}}/{{pascalCase name}}View.tsx",
          templateFile: "plop_blueprints/ViewComponent.tsx.hbs",
          data: { ...data, view: "view" },
        });
      }

      return actions;
    },
  });

  plop.setGenerator("view-component", {
    description: "Create a View Component",
    prompts: [
      {
        type: "input",
        name: "destpath",
        message: "What is this component's Path?",
      },
      {
        type: "input",
        name: "name",
        message: "What is this component's name?",
      },

      {
        type: "confirm",
        name: "observable",
        message: "Is this observable?",
        default: true,
      },
    ],
    actions: function (data) {
      var actions = [];

      if (data.observable) {
        actions.push({
          type: "add",
          path: "{{destpath}}/{{pascalCase name}}.tsx",
          templateFile: "plop_blueprints/ObservableViewComponent.tsx.hbs",
          data: { ...data, view: "" },
        });
      } else {
        actions.push({
          type: "add",
          path: "{{destpath}}/{{pascalCase name}}.tsx",
          templateFile: "plop_blueprints/ViewComponent.tsx.hbs",
          data: { ...data, view: "" },
        });
      }

      return actions;
    },
  });

  plop.setGenerator("service", {
    description: "Create a service",
    prompts: [
      {
        type: "input",
        name: "destpath",
        message: "What is this service's Path?",
      },
      {
        type: "input",
        name: "name",
        message: "What is this service's name?",
      },
    ],
    actions: function (data) {
      var actions = [];

      actions.push({
        type: "add",
        path: "{{destpath}}/{{pascalCase name}}Service.tsx",
        templateFile: "plop_blueprints/Service.tsx.hbs",
      });

      return actions;
    },
  });

  plop.setGenerator("row-actions", {
    description: "Create a Row Action",
    prompts: [
      {
        type: "input",
        name: "destpath",
        message: "What is this component's Path?",
      },
      {
        type: "input",
        name: "model",
        message: "What is the model name?",
      },
      {
        type: "input",
        name: "modelPlural",
        message: "What is the model plural name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{destpath}}/{{pascalCase model}}RowActions.tsx",
        templateFile: "plop_blueprints/RowActions.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("vite_pod", {
    description: "Create a Vite Pod",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is this Models name? (i.e. cool_model)",
      },
      {
        type: "input",
        name: "pluralName",
        message: "What is this Models plural? (i.e. cool_models)",
      },
    ],
    actions: [
      // Models
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/_constants/status.ts",
        templateFile: "plop_blueprints/vite_pod/_constants/status.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/model/{{pascalCase name}}BaseModel.ts",
        templateFile: "plop_blueprints/vite_pod/model/BaseModel.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/model/{{pascalCase name}}Model.ts",
        templateFile: "plop_blueprints/vite_pod/model/Model.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/model/validation_rules.ts",
        templateFile: "plop_blueprints/vite_pod/model/validation_rules.ts.hbs",
        abortOnFail: abortOnFail,
      },

      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/constants.ts",
        templateFile: "plop_blueprints/vite_pod/constants.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/services/{{pascalCase name}}Service.ts",
        templateFile: "plop_blueprints/vite_pod/model/Service.ts.hbs",
        abortOnFail: abortOnFail,
      },

      // Admin Pod

      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/filters.ts",
        templateFile: "plop_blueprints/vite_pod/filters.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/columns.tsx",
        templateFile: "plop_blueprints/vite_pod/columns.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/pages/{{pascalCase name}}Edit.tsx",
        templateFile: "plop_blueprints/vite_pod/pages/Edit.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/pages/{{pascalCase name}}Index.tsx",
        templateFile: "plop_blueprints/vite_pod/pages/Index.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/pages/{{pascalCase name}}New.tsx",
        templateFile: "plop_blueprints/vite_pod/pages/New.tsx.hbs",
        abortOnFail: abortOnFail,
      },

      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/pages/{{pascalCase name}}Details.tsx",
        templateFile: "plop_blueprints/vite_pod/pages/Details.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/components/{{pascalCase name}}Form.tsx",
        templateFile: "plop_blueprints/vite_pod/components/Form.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/pods/{{lowerCase name}}/components/{{pascalCase name}}FormModal.tsx",
        templateFile: "plop_blueprints/vite_pod/components/FormModal.tsx.hbs",
        abortOnFail: abortOnFail,
      },

      // Admin Routes
      {
        type: "add",
        path: "apps/admin/app/routes/_auth/{{lowerCase pluralName}}/index/index.tsx",
        templateFile: "plop_blueprints/vite_pod/route/index.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/routes/_auth/{{lowerCase pluralName}}/new/index.tsx",
        templateFile: "plop_blueprints/vite_pod/route/new.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/routes/_auth/{{lowerCase pluralName}}/edit.$id/index.tsx",
        templateFile: "plop_blueprints/vite_pod/route/edit.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/app/routes/_auth/{{lowerCase pluralName}}/details.$id/index.tsx",
        templateFile: "plop_blueprints/vite_pod/route/details.tsx.hbs",
        abortOnFail: abortOnFail,
      },
    ],
  });

  plop.setGenerator("pod", {
    description: "Create a Pod",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is this Models name? (i.e. cool_model)",
      },
      {
        type: "input",
        name: "pluralName",
        message: "What is this Models plural? (i.e. cool_models)",
      },
    ],
    actions: [
      // Models
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/_constants/status.ts",
        templateFile: "plop_blueprints/pod/_constants/status.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/model/{{pascalCase name}}BaseModel.ts",
        templateFile: "plop_blueprints/pod/model/BaseModel.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/model/{{pascalCase name}}Model.ts",
        templateFile: "plop_blueprints/pod/model/Model.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/model/validation_rules.ts",
        templateFile: "plop_blueprints/pod/model/validation_rules.ts.hbs",
        abortOnFail: abortOnFail,
      },

      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/constants.ts",
        templateFile: "plop_blueprints/pod/constants.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "packages/models/src/models/{{lowerCase name}}/services/{{pascalCase name}}Service.ts",
        templateFile: "plop_blueprints/pod/model/Service.ts.hbs",
        abortOnFail: abortOnFail,
      },

      // Admin Pod

      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/filters.ts",
        templateFile: "plop_blueprints/pod/filters.ts.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/columns.tsx",
        templateFile: "plop_blueprints/pod/columns.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/pages/{{pascalCase name}}Edit.tsx",
        templateFile: "plop_blueprints/pod/pages/Edit.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/pages/{{pascalCase name}}Index.tsx",
        templateFile: "plop_blueprints/pod/pages/Index.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/pages/{{pascalCase name}}New.tsx",
        templateFile: "plop_blueprints/pod/pages/New.tsx.hbs",
        abortOnFail: abortOnFail,
      },

      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/pages/{{pascalCase name}}Details.tsx",
        templateFile: "plop_blueprints/pod/pages/Details.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/components/{{pascalCase name}}Form.tsx",
        templateFile: "plop_blueprints/pod/components/Form.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pods/{{lowerCase name}}/components/{{pascalCase name}}FormModal.tsx",
        templateFile: "plop_blueprints/pod/components/FormModal.tsx.hbs",
        abortOnFail: abortOnFail,
      },

      // Admin Routes
      {
        type: "add",
        path: "apps/admin/src/pages/{{lowerCase pluralName}}/index.tsx",
        templateFile: "plop_blueprints/pod/route/index.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pages/{{lowerCase pluralName}}/new/index.tsx",
        templateFile: "plop_blueprints/pod/route/new.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pages/{{lowerCase pluralName}}/edit/[id].tsx",
        templateFile: "plop_blueprints/pod/route/edit.tsx.hbs",
        abortOnFail: abortOnFail,
      },
      {
        type: "add",
        path: "apps/admin/src/pages/{{lowerCase pluralName}}/details/[id].tsx",
        templateFile: "plop_blueprints/pod/route/details.tsx.hbs",
        abortOnFail: abortOnFail,
      },
    ],
  });
};
