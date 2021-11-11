export default {
    name: 'note-img',
    props: ['info'],
    template: `
        <div class="note-img">
            <h2 class="note-title">{{ info.title }}</h2>
            <img :src="info.url" :alt="info.title">
        </div>
    `
}