Given the current component, properly annotate the sub parts of the component with data attributes that would allow css to target parts of the component easily. 
Do not add anything other then slots and documentation to the component.

Example of slots:

<div data-slot="{example-component}-wrapper">
  <table data-slot="{example-component}-table">
    <thead data-slot="{example-component}-table-thead">
      <tr data-slot="{example-component}-table-thead-tr">
        <th>one</th>
        <th>two</th>
        <th>three</th>
      </tr>
    </thead>
    <tbody data-slot="{example-component}-table-tbody">
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>

    <tfoot data-slot="{example-component}-table-tfoot">
      <tr>
        <td></td>
      </tr>
    </tfoot>

  </table>
</div>

the goal is that the important slots of the component are properly annotated so that we can overload the components styles if needed from the top. after annotating the file, put a block at the top of the coponent with docs for all the slots within it. If the component uses sub components, it should bubble up those slots:

-

- @example
- Any Child [&\_\*[data-slot='thead-tr']]:border-t

- ## TableBase slots
- @example
- Any Child [&\_\*[data-slot='thead-tr']]:border-t

- @slot {"table-wrap"} data-slot="table-wrap"
- @slot {"table"} data-slot="table"
- @slot {"thead"} data-slot="thead"
- @slot {"tbody"} data-slot="tbody"
- @slot {"no-data"} data-slot="no-data"
-
- ## Table Row slots
- @slot {"tr"} data-slot="tr"
- @slot {"expand-row-td"} data-slot="expand-row-td"
-
-
- ## Header Slots
- @slot {"thead-tr"} data-slot="thead-tr"
- @slot {"thead-checkbox-div"} data-slot="thead-checkbox-div"
- @slot {"thead-checkbox"} data-slot="thead-checkbox"
-
-
- ## Footer Slots
- @slot {"tfoot"} data-slot="tfoot"
- @slot {"total-row"} data-slot="total-row"
- @slot {"table-pagination"} data-slot="table-pagination"
- @slot {"table-pagination-page-size"} data-slot="table-pagination-page-size"
- @slot {"table-pagination-start-end"} data-slot="table-pagination-start-end"
