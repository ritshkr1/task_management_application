# TaskManagementApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Aditional Links

[Duplicate Styles with Angular Material](https://v17.material.angular.io/docs-content/guides/duplicate-theming-styles#:~:text=To%20avoid%20this%20duplication%20of,color%20system%20from%20the%20theme.)

1. Initialize the Property
Provide an initial value to the sort property in the class definition or constructor.

typescript
Copy code
export class YourComponent {
  sort: any = null; // or appropriate default value
}
2. Mark the Property as Optional
Use the ? to indicate that the property is optional.

typescript
Copy code
export class YourComponent {
  sort?: any;
}
3. Use the Definite Assignment Operator
If you are sure that sort will be assigned before use, add the ! operator to skip the initialization check.

typescript
Copy code
export class YourComponent {
  sort!: any;
}
4. Disable Strict Property Initialization (Global Fix)
If you don’t want this check for all properties in your project, you can turn off strictPropertyInitialization in tsconfig.json.

json
Copy code
{
  "compilerOptions": {
    "strictPropertyInitialization": false
  }
}
