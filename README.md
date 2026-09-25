# Local Path Crumbs

A small, private VS Code extension with one status bar item showing the current workspace folder.

## Try it

1. Open this folder in VS Code.
2. Select **Run Local Path Crumbs** in Run and Debug, then press **Ctrl+F5** (Start Without Debugging).
3. In the new **Extension Development Host** window, open or close a folder and watch the status bar item update.

Restart the Extension Development Host after changing the extension files.

## Install it in your regular VS Code profile

VS Code's supported local-install format is a `.vsix` package. This project is packaged in a temporary Docker container, so Node.js and `vsce` do not need to be installed on the host. Docker Desktop must be running.

1. In PowerShell, run:

   ```powershell
   docker run --rm --mount "type=bind,source=C:...,target=/workspace" --workdir /workspace node:22-bookworm-slim sh -lc "npx --yes @vscode/vsce package --out local-path-crumbs-0.1.0.vsix"
   ```

2. In your regular VS Code window, run **Extensions: Install from VSIX...** from the Command Palette.
3. Select `local-path-crumbs-0.1.0.vsix` from this folder and reload VS Code when prompted.
4. Close the Extension Development Host. The status item will now load in your normal VS Code windows.

For future updates, increase the `version` in `package.json`, run the Docker command again, and install the newly generated VSIX.

## Behavior

- With no folder open, the status item says **Open Folder** and clicking it opens the user's home directory in the operating system's file browser.
- With one workspace folder open, the item shows its full path, except folders inside the user's home directory use `~/...` (for example, `~/Projects/demo`).
- With a multi-root workspace, the item says **Multiple Folders** and shows the paths in its tooltip. Clicking it opens the first workspace folder in the file browser.
- Click the status item to reveal the current workspace folder in the operating system's file browser.

## Undo the trial

Close the **Extension Development Host** window. The extension is only loaded in that separate test window; your regular VS Code installation and profile are unchanged.

If you installed the VSIX, open Extensions, search for **Local Path Crumbs**, and choose **Uninstall**. Reload VS Code if prompted. The VSIX file can then be deleted.

To remove this trial project from disk, close VS Code windows using it, then delete:

- `package.json`
- `extension.js`
- `README.md`
- `.vscodeignore`
- `.vscode/launch.json`
- `local-path-crumbs-0.1.0.vsix`

The `.vscode` folder was created just for the launch configuration. If it contains only `launch.json`, delete the folder too.
