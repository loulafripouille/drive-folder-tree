# drive-folder-tree
Generates a folder tree from the Google Drive REST API files.list endpoint.

## why?
I made this because I needed a way to print the folder structure of my team's drive. Therefore, I also made a little html/css integration of the JSON result of this project. Then I converted the html/css into a `.pdf` file.

# install
As it is a little personnal project, I am not considering any improvement on it and I do not plan to publish it as a npm/yarn package. Thus, you may need to clone or download or fork this repo. Or maybe, even simpler, get inspired by it!

## dotenv
This project is using the **dotenv** package thus you should add a `.env` file at the root directory.
Your `.env` file should contain at least these three env variables:
```
GOOGLE_CLIENT_ID=<your google client id>
GOOGLE_CLIENT_SECRET=<your google client secret>
GOOGLE_REDIRECT_URL=<callback url>
```

## api
### .tree([params])
Returns an array, the folder tree. The argument *params* is the argument passed to the Google Drive API `files.list` [method](https://developers.google.com/drive/v3/reference/files/list).
### .treeToFile([params])
Creates a JSON file containing the folder tree. The argument *params* is the argument passed to the Google Drive API `files.list` [method](https://developers.google.com/drive/v3/reference/files/list).
