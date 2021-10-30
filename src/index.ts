import joplin from "api";
import { ToolbarButtonLocation } from "api/types";

joplin.plugins.register({
  onStart: async function () {
    const homeNoteId = localStorage.getItem("homeNoteId");
    if (homeNoteId) {
      try {
				await joplin.commands.execute("openNote", homeNoteId);
			} catch (error) {
				//when note is deleted maybe
				console.error(error.message);
			}
    }

    await joplin.commands.register({
      name: "setHomenote",
      label: "open this note each time joplin is launched",
      iconName: "fas fa-home",
      execute: () =>
        new Promise((resolve, reject) => {
          const selectedNote = joplin.workspace.selectedNote();
          selectedNote
            .then((currentNote) =>
              localStorage.setItem("homeNoteId", currentNote.id)
            )
            .then((d) => alert("Current note selected as homenote"));
          resolve(1);
        }),
    });
    await joplin.views.toolbarButtons.create(
      "idHomenote",
      "setHomenote",
      ToolbarButtonLocation.EditorToolbar
    );
  },
});
