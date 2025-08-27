import joplin from "api";
import { MenuItemLocation, SettingItemType, ToolbarButtonLocation } from "api/types";

joplin.plugins.register({
	onStart: async function () {
		// Register the setting for homeNoteId
		await joplin.settings.registerSettings({
			homeNoteId: {
				value: '',
				type: SettingItemType.String, 
				public: false,
				label: 'Home Note ID',
			},
		});
		//todo: hack to counteract a joplin issue where focus remains on setHomenote button despite dialog is opened
		// https://discourse.joplinapp.org/t/home-note-open-a-choosen-note-each-time-joplin-starts-it-is-like-homepages-on-browsers/43704/2
		let dialogOpen = false;
		const registeredHomenoteDialog = await joplin.views.dialogs.create(
			"homenoteRegistered"
		);

		await joplin.commands.register({
			name: "setHomenote",
			label: "Set as HomeNote",
			iconName: "fas fa-star",
			execute: async () => {
				if (dialogOpen) return;
				try {
					const selectedNote = await joplin.workspace.selectedNote();
					if (selectedNote) {
						await joplin.settings.setValue("homeNoteId", selectedNote.id);
						await joplin.views.dialogs.setHtml(
							registeredHomenoteDialog,
							`<p>Homenote Set. <br/> Go to tools → set as Homenote to change Homenote</p>`
						);
						dialogOpen = true;
						await joplin.views.dialogs.open(registeredHomenoteDialog);
						setTimeout(() => {
							dialogOpen = false;
						}, 1000);
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
			label: "Open or set as HomeNote",
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
			label: "Open HomeNote",
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

		const isMobilePlatform = await isMobile();
    if (isMobilePlatform) {
			console.log({isMobilePlatform})
      await joplin.views.toolbarButtons.create(
        "openHomenoteId",
        "openHomenote",
        ToolbarButtonLocation.NoteToolbar
      );
    }	

		await joplin.views.toolbarButtons.create(
			"setHomenoteId",
			"setHomenote",
			ToolbarButtonLocation.NoteToolbar
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

const isMobile = async () => {
	try {
    const version = await joplin?.versionInfo?.();
    return version?.platform === "mobile";
  } finally {
		// default to mobile
    return true;
  }
};
