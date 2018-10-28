### Troubleshooting

- **Problem**: When adding a package via `yarn add <package_name>` I get this error:
  ```
  error @google-cloud/functions-emulator@1.0.0-beta.5: The engine "node" is incompatible with this module. Expected version "~6".
  error Found incompatible module
  ```
- **Solution**: Use `yarn add <package_name> --ignore-engines`. Also ensure that the module works with Node.js 6.0.
