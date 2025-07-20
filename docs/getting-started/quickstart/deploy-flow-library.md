# Deploy Flow Library

Now that you have created your Flow Library and installed Didact's applications, it's time to deploy your Flow Library to a Library Source so that Didact Engine can find and synchronize it.

## Create build artifacts

To deploy your Flow Library, you'll use the Didact CLI that you previously installed.

1. Open a terminal and navigate to the root directory of your Flow Library (where your .csproj file is).
2. Publish your Flow Library to a local folder using the dotnet CLI.

```bash
dotnet publish
```

## Deploy build artifacts

3. Now navigate to your publish folder that contains the build artifacts (the .dll files and and so on).
4. Inside the publish folder, use Didact CLI to deploy your build artifacts and create a Library Source within Didact's database.

```bash
didact library deploy
```