export default {
    name: 'note-vid',
    props: ['info'],
    template: `
        <div class="note-video">
            <h3 class="note-title">{{ info.title }}</h3>
            <iframe :src="ytEmbed+info.url"></iframe>
        </div>
    `,
    data() {
        return {
            ytEmbed: 'https://www.youtube.com/embed/'
        }
    },
}