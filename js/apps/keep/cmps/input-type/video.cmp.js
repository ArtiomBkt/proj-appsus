export default {
    name: 'note-vid',
    props: ['info'],
    template: `
        <div class="note-video">
            <iframe :src="info.url"></iframe>
        </div>
    `,
}