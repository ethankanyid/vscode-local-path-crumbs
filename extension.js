const os = require('os');
const path = require('path');
const vscode = require('vscode');

const OPEN_FOLDER_COMMAND = 'vscode.openFolder';

/** @param {vscode.ExtensionContext} context */
function activate(context) {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10000);
  item.command = OPEN_FOLDER_COMMAND;
  item.show();

  const update = () => {
    const folders = vscode.workspace.workspaceFolders || [];

    if (folders.length === 0) {
      item.text = '$(folder-opened) Open Folder';
      item.tooltip = 'Click to open a folder in VS Code';
      return;
    }

    if (folders.length > 1) {
      item.text = `$(folder-library) Multiple Folders (${folders.length})`;
      item.tooltip = `This workspace contains multiple folders:\n${folders.map((folder) => folder.uri.fsPath).join('\n')}\n\nClick to open a folder`;
      return;
    }

    const folder = folders[0];
    const folderPath = folder.uri.scheme === 'file' ? folder.uri.fsPath : folder.uri.toString();
    const homeRelativePath = folder.uri.scheme === 'file'
      ? relativeToHome(folderPath, os.homedir())
      : undefined;

    item.text = homeRelativePath === undefined ? folderPath : homeRelativePath;
    item.tooltip = `${folder.name}\n${folderPath}\n\nClick to open a different folder`;
  };

  context.subscriptions.push(
    item,
    vscode.workspace.onDidChangeWorkspaceFolders(update)
  );

  update();
}

function relativeToHome(folderPath, homePath) {
  const relativePath = path.relative(homePath, folderPath);
  if (relativePath === '') return '~';
  if (relativePath === '..' || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
    return undefined;
  }
  return `~/${relativePath.split(path.sep).join('/')}`;
}

function deactivate() {}

module.exports = { activate, deactivate };
