import joplin from "api";
import { MenuItemLocation, ToolbarButtonLocation } from "api/types";

joplin.plugins.register({
	onStart: async function () {
		// Register the setting for homeNoteId
		await joplin.settings.registerSettings({
			homeNoteId: {
				value: '',
				type: 2, // String type
				section: 'myPluginSection',
				public: true,
				label: 'Home Note ID',
			},
		});

		const registeredHomenoteDialog = await joplin.views.dialogs.create(
			"homenoteRegistered"
		);

		await joplin.commands.register({
			name: "setHomenote",
			label: "Set as Homenote",
			iconName: "fas fa-home",
			execute: async () => {
				try {
					const selectedNote = await joplin.workspace.selectedNote();
					if (selectedNote) {
						await joplin.settings.setValue("homeNoteId", selectedNote.id);
						await joplin.views.dialogs.setHtml(
							registeredHomenoteDialog,
							`<p>Homenote Set. <br/> Go to tools → set as Homenote to change Homenote</p>`
						);
						await joplin.views.dialogs.open(registeredHomenoteDialog);
					} else {
						console.error("No note selected");
					}
				} catch (error) {
					console.error("Error setting home note:", error);
				}
			},
		});
		await joplin.commands.register({
			name: "openElseSetHomenote",
			label: "open or set as Homenote",
			iconName: "fas fa-home",
			execute: async () => {
				const homeNoteId = await getHomeNoteId();
				if (homeNoteId) {
					await joplin.commands.execute("openHomenote");
					return;
				}
				await joplin.commands.execute("setHomenote");
			},
		});
		await joplin.commands.register({
			name: "openHomenote",
			label: "Open the Homenote",
			iconName: "fas fa-home",
			execute: async () => {
				const homeNoteId = await getHomeNoteId();
				try {
					await joplin.commands.execute("openNote", homeNoteId);
				} catch (error) {
					//when note is deleted maybe or no homenote set yet
					console.error(error.message);
				}
			},
		});

		const homeNoteId = await getHomeNoteId();
		if (homeNoteId) await joplin.commands.execute("openHomenote");
		await joplin.views.toolbarButtons.create(
			"idHomenote",
			"openElseSetHomenote",
			ToolbarButtonLocation.EditorToolbar
		);

		await joplin.views.toolbarButtons.create(
			"idHomenote",
			"openHomenote",
			ToolbarButtonLocation.NoteToolbar
		);

		await joplin.views.toolbarButtons.create(
			"setHomenote",
			"setHomenote",
			ToolbarButtonLocation.NoteToolbar
		);

		await joplin.views.dialogs.setHtml(
			registeredHomenoteDialog,
			`<p>Current note selected as Homenote</p>`
		);
		await joplin.views.dialogs.setButtons(registeredHomenoteDialog, [
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

async function getHomeNoteId():Promise<string | undefined>{
	const homeNoteId = await joplin.settings.values("homeNoteId");	
	console.log(homeNoteId);
	return homeNoteId.homeNoteId as string;
}
