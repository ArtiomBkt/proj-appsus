export default {
    name: 'note-vid',
    props: ['info'],
    template: `
        <div class="note-video">
            <h3 class="note-title">{{ info.title }}</h3>
            <iframe :src="info.url" 
                title="YouTube video player" frameborder="0" allow="accelerometer;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
    `,
}