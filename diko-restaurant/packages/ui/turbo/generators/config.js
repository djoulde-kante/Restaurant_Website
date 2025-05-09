export default function generator(plop) {
  plop.setGenerator("react-component", {
    description: "Ajoute un nouveau composant React",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Quel est le nom du composant ?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{kebabCase name}}.jsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "append",
        path: "package.json",
        pattern: /"exports": {(?<insertion>)/g,
        template: '    "./{{kebabCase name}}": "./src/{{kebabCase name}}.jsx",',
      },
    ],
  });
}