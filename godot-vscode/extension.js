// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const fs = require('fs');

function createCppProperties() {
	var project = vscode.workspace.getConfiguration().get('godotProject.path');
	var rpath = __dirname + "\\godot.vscode\\" + "c_cpp_properties.json";
	var wpath = `${project}\\`+"..\\" + ".vscode\\" + "c_cpp_properties.json";
	var data = fs.readFileSync(rpath)
	fs.writeFileSync(wpath, data);

	vscode.window.showInformationMessage('Genetate c_cpp_properties.json from godot-vscode!');
}
function createTasks() {

	var project = vscode.workspace.getConfiguration().get('godotProject.path');
	var rpath = __dirname + "\\godot.vscode\\" + "tasks.json";
	var wpath = `${project}\\`+"..\\" + ".vscode\\" + "tasks.json";
	var data = fs.readFileSync(rpath)
	fs.writeFileSync(wpath, data);
	
	vscode.window.showInformationMessage('Genetate tasks.json from godot-vscode!');
}

function createLaunch() {
	var project = vscode.workspace.getConfiguration().get('godotProject.path');
	var rpath = __dirname + "\\godot.vscode\\" + "launch.json";
	var wpath = `${project}\\`+"..\\" + ".vscode\\" + "launch.json";
	var data = fs.readFileSync(rpath)
	fs.writeFileSync(wpath, data);

	vscode.window.showInformationMessage('Genetate launch.json from godot-vscode!');
}

function createCodeworkspace() {

	var name = vscode.workspace.getConfiguration().get('godotProject.name');
	var version = vscode.workspace.getConfiguration().get('godotEngine.version');
	var engine = vscode.workspace.getConfiguration().get('godotEngine.source');
	var json  = {
		"folders": [
			{
				"name": `${name}`, 
				"path": "."
			},
			{
				"name": `${version}`, 
				"path": `${engine}` 
			}
		],
		"settings": {
			"typescript.tsc.autoDetect": "off",
			"files.associations": {
				"cstdlib": "cpp"
			}
		},
		"extensions": {
			"recommendations": [
				"ms-vscode.cpptools"
			]
		}
	}

	console.log(JSON.stringify(json))

	var project = vscode.workspace.getConfiguration().get('godotProject.path');
	var name = vscode.workspace.getConfiguration().get('godotProject.name');
	var path = `${project}\\` +"..\\"+ `${name}` + ".code-workspace";
	fs.writeFileSync(path, JSON.stringify(json));

	vscode.window.showInformationMessage('Genetate code-workspace from godot-vscode!');
}



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('extension "godot-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('godot-vscode.Init', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		
		var project = vscode.workspace.getConfiguration().get('godotProject.path');
		var path = `${project}\\`+"..\\" + ".vscode";
		if(!fs.existsSync(path)){
			fs.mkdirSync(path)
		}
		
 
		createCppProperties();

		createTasks();

		createLaunch();

		createCodeworkspace();

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
