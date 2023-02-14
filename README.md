# Postman to Markdown

This is a simple script to convert exported Postman collection json(v2.1) to Markdown.


## Usage

1. Move exported json files to `./src` folder, those files must be exported from Postman v2.1, and is named as `*.json`.
2. Execute `npm start` to convert json files to Markdown files.
   - You may define the number start by passing argument `--start {n}` or `-s {n}`, where `{n}` should be replace by the number desired, e.g. `npm start -- -s 5` will start the number from 5.
3. Markdown files will be generated in `./dist` folder.


## TODO

- [ ] Handle json format in request body.
- [ ] Convert markdown to postman collection json.