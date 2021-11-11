export default {
    name: 'note-edit',
    props: ['note'],
    template: `
        <section class="note-edit">
            <form @submit.prevent="validateForm" novalidate="true">
                <div class="input-row">
                    <input v-if="note.type !== 'note-txt'" type="text" :v-model="note.title" placeholder="Title" />
                    <input type="text" :v-model="note.txt" placeholder="What's on your mind.." />
                </div>
                <input type="submit" value="Submit edit" />
            </form>
        </section>
    `
}