import joplin from "api";
import { MenuItemLocation, ToolbarButtonLocation } from "api/types";

joplin.plugins.register({
	onStart: async function () {
		await joplin.commands.register({
			name: "setHomenote",
			label: "Set as Homenote",
			iconName: "fas fa-home",
			execute: () =>
				new Promise((resolve, reject) => {
					const selectedNote = joplin.workspace.selectedNote();
					selectedNote
						.then(currentNote =>
							localStorage.setItem("homeNoteId", currentNote.id)
						)
						.then(async d => {
							joplin.views.dialogs.open(regiteredHomenoteDialog);
						});
					resolve(1);
				}),
		});
		await joplin.commands.register({
			name: "openElseSetHomenote",
			label: "open or set as Homenote",
			iconName: "fas fa-home",
			execute: () =>
				new Promise((resolve, reject) => {
					if (localStorage.getItem("homeNoteId")) {
						joplin.commands.execute("openHomenote");
						return;
					}
					joplin.views.dialogs.setHtml(
						regiteredHomenoteDialog,
						`<p>Homenote Set. <br/> Go to tools → set as Homenote to change Homenote</p>`
					);
					joplin.commands.execute("setHomenote");
				}),
		});
		await joplin.commands.register({
			name: "openHomenote",
			label: "Open the Homenote",
			iconName: "fas fa-home",
			execute: async () => {
				const homeNoteId = localStorage.getItem("homeNoteId");

				try {
					await joplin.commands.execute("openNote", homeNoteId);
				} catch (error) {
					//when note is deleted maybe or no homenote set yet
					console.error(error.message);
				}
			},
		});

		if (localStorage.getItem("homeNoteId"))
			await joplin.commands.execute("openHomenote");
		await joplin.views.toolbarButtons.create(
			"idHomenote",
			"openElseSetHomenote",
			ToolbarButtonLocation.EditorToolbar
		);

		const regiteredHomenoteDialog = await joplin.views.dialogs.create(
			"homenoteRegistered"
		);
		await joplin.views.dialogs.setHtml(
			regiteredHomenoteDialog,
			`<p>Current note selected as Homenote</p>`
		);
		await joplin.views.dialogs.setButtons(regiteredHomenoteDialog, [
			{
				id: "ok",
			},
		]);

		await joplin.views.menuItems.create(
			"setHomeNoteMenu",
			"setHomenote",
			MenuItemLocation.Tools,
			{ accelerator: "CmdOrCtrl+Alt+Shift+H" }
		);
		await joplin.views.menuItems.create(
			"openHomenoteMenu",
			"openHomenote",
			MenuItemLocation.Tools,
			{ accelerator: "CmdOrCtrl+Shift+H" }
		);
	},
});
