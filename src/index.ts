import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';

joplin.plugins.register({
	onStart: async function () {
		joplin.commands.register({
			name: 'setHomenote',
			label: 'open this note on each startup',
			iconName: 'fas fa-home',
			execute: () => new Promise((resolve, reject) => {
				const selectedNote=joplin.workspace.selectedNote();
				selectedNote.then(currentNote=>localStorage.setItem('homeNoteId',currentNote.id)).then(d=>alert('Current note selected as homenote'))
				resolve(1);
				
			})
		})
		joplin.views.toolbarButtons.create('idHomenote', 'setHomenote', ToolbarButtonLocation.EditorToolbar);

		const homeNoteId=localStorage.getItem('homeNoteId');
		if(homeNoteId) {joplin.commands.execute('openNote',homeNoteId)}
	},
});
