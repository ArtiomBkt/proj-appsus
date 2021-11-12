export default {
    name: 'note-vid',
    props: ['info'],
    template: `
        <div class="note-video">
            <h3 class="note-title">{{ info.title }}</h3>
            <video :src="info.url" controls></video>
        </div>
    `,
}