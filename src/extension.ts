import * as vscode from 'vscode';

function getCurrentDate(): string {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}.${month}.${year}`;
}

function getCurrentTime(): string {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

async function insertText(text: string) {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showWarningMessage(
            'Сначала откройте файл!'
        );
        return;
    }

    await editor.edit(editBuilder => {
        editBuilder.insert(
            editor.selection.active,
            text
        );
    });
}

export function activate(context: vscode.ExtensionContext) {

    vscode.window.showInformationMessage('DateTime Helper успешно активирован!');

    const dateCommand = vscode.commands.registerCommand(
        'datetime-helper.insertDate',
        () => insertText(getCurrentDate())
    );

    const timeCommand = vscode.commands.registerCommand(
        'datetime-helper.insertTime',
        () => insertText(getCurrentTime() + "a")
    );

    const dateTimeCommand = vscode.commands.registerCommand(
        'datetime-helper.insertDateTime',
        () => insertText(
            `${getCurrentDate()} ${getCurrentTime()}`
        )
    );

    context.subscriptions.push(
        dateCommand,
        timeCommand,
        dateTimeCommand
    );
}

export function deactivate() {}
